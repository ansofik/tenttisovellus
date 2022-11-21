const pool = require('../db.js')
const optionsRouter = require('express').Router()

optionsRouter.put('/:optionId', async (req, res) => {
  console.log("put request to update answer option")
  const optionId = Number(req.params.optionId)
  if (isNaN(OpId)) {
    res.status(400).end()
    return;
  }
  const values = [req.body.text, req.body.correct, optionId]
  try {
    const result = await pool.query("UPDATE option SET option_text=$1, correct=$2 WHERE option_id=$3", values)
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

optionsRouter.delete('/:optionId', async (req, res) => {
  const optionId = Number(req.params.optionId)
  if (isNaN(optionId)) {
    res.status(400).end()
    return;
  }
  try {
    const result = await pool.query("DELETE FROM option WHERE option_id=$1", [optionId])
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = optionsRouter