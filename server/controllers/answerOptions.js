const pool = require('../db.js')
const answerOptionsRouter = require('express').Router()

answerOptionsRouter.put('/:answeroptionId', async (req, res) => {
  console.log("put request to update answer option")
  const ansOpId = Number(req.params.answeroptionId)
  if (isNaN(ansOpId)) {
    res.status(400).end()
    return;
  }
  const values = [req.body.text, req.body.correct, ansOpId]
  try {
    const result = await pool.query("UPDATE answer_option SET text=$1, correct=$2 WHERE answer_option_id=$3", values)
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

answerOptionsRouter.delete('/:answeroptionId', async (req, res) => {
  const answerOptionId = Number(req.params.answeroptionId)
  if (isNaN(ansOpId)) {
    res.status(400).end()
    return;
  }
  try {
    const result = await pool.query("DELETE FROM answer_option WHERE answer_option_id=$1", [answerOptionId])
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = answerOptionsRouter