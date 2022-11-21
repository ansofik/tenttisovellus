const pool = require('../db.js')
const questionsRouter = require('express').Router()

questionsRouter.put('/:questionId', async (req, res) => {
  console.log("put request to update a question")
  const questionId = Number(req.params.questionId)
  if (isNaN(questionId)) {
    res.status(400).end()
    return;
  }
  try {
    const result = await pool.query("UPDATE question SET text=$1 WHERE question_id=$2", [req.body.text, questionId])
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

questionsRouter.delete('/:questionId', async (req, res) => {
  const questionId = Number(req.params.questionId)
  if (isNaN(questionId)) {
    res.status(400).end()
    return;
  }
  try {
    const result = await pool.query("DELETE FROM question WHERE question_id=$1", [questionId])
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

questionsRouter.post('/:questionId/options', async (req, res) => {
  console.log('add answer option');
  const questionId = Number(req.params.questionId)
  if (isNaN(questionId)) {
    res.status(400).end()
    return;
  }
  const query = {
    text: 'INSERT INTO option (question_id, text, correct) VALUES ($1,$2,$3) RETURNING option_id',
    values: [questionId, req.body.text, req.body.correct],
  }
  console.log(query)
  try {
    const result = await pool.query(query)
    res.status(201).send(result.rows[0].option_id)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = questionsRouter