const pool = require('../db.js')
const express = require('express')
const isAdmin = require('../middlewares/isAdmin')
const examsRouter = express.Router()

examsRouter.get('/', async (req, res) => {
  console.log("received get request for exams")
  try {
    const result = await pool.query('SELECT exam_id id, name, published FROM exam ORDER BY exam_id')
    console.log(result.rows)
    res.send(result.rows)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

// get specific exam and its questions and answer options in json format
examsRouter.get('/:examId', async (req, res) => {
  console.log("received get request for an exam by id")
  const examId = Number(req.params.examId)
  if (isNaN(examId)) {
    res.status(400).end()
    return;
  }

  const query = {
    text: 'SELECT e.exam_id, e.name, q.question_id, q.question_text, o.option_id, o.option_text, o.correct FROM exam e LEFT JOIN question q ON e.exam_id = q.exam_id LEFT JOIN option o ON q.question_id = o.question_id WHERE e.exam_id=$1 ORDER BY o.option_id',
    values: [examId]
  }
  try {
    const result = await pool.query(query)
    if (result.rowCount === 0) {
      console.log('no exam matches given id')
      res.status(404).end()
      return;
    }
    const questionList = result.rows.reduce((prev, curr) => {
      if (curr.question_id === null) {
        return prev
      }
      let question = prev.find(q => q.questionId === curr.question_id)
      if (!question) {
        question = { questionId: curr.question_id, questionText: curr.question_text, options: []}
        prev.push(question)
      }
      if (curr.option_id === null) {
        return prev
      }
      const newOption = { optionId: curr.option_id, optionText: curr.option_text, correct: curr.correct}
      question.options.push(newOption)
      return prev
    }, [])

    const dataObj = { id: result.rows[0].exam_id, name: result.rows[0].name, questions: questionList }
    res.json(dataObj)
  } catch (err) {
    console.log(err);
    res.status(500).end()
  }
})

examsRouter.post('/', async (req, res) => {
  console.log("post request for new exam")
  const values = [req.body.name, false]
  try {
    const result = await pool.query("INSERT INTO exam (name, published) VALUES ($1,$2) RETURNING exam_id", values)
    res.status(201).send(result.rows[0].exam_id)
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
})

examsRouter.put('/:examId', async (req, res) => {
  console.log("put request to update exam")
  const examId = Number(req.params.examId)
  if (isNaN(examId)) {
    res.status(400).end()
    return;
  }
  const values = [req.body.name, examId]
  try {
    const result = await pool.query("UPDATE exam SET name=$1 WHERE exam_id=$2", values)
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      console.log('no exam matches given id')
      res.status(404).end()
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
})

examsRouter.delete('/:examId', async (req, res) => {
  console.log('delete request for exam')
  const examId = Number(req.params.examId)
  if (isNaN(examId)) {
    res.status(400).end()
    return;
  }
  try {
    await pool.query('BEGIN')
    await pool.query('DELETE FROM option o USING question q WHERE o.question_id = q.question_id AND q.exam_id=$1', [examId])
    console.log('deleted options')
    await pool.query('DELETE FROM question q WHERE q.exam_id=$1', [examId])
    console.log('deleted questions', examId)
    const result = await pool.query("DELETE FROM exam WHERE exam_id=$1", [examId])
    console.log('deleted exam')
    await pool.query('COMMIT')
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      console.log('no exam matches given id')
      res.status(404).end()
    }
  } catch (err) {
    await pool.query('ROLLBACK')
    res.status(500).send(err)
  }
})

examsRouter.post('/:examId/questions', async (req, res) => {
  console.log('post request for adding a question');
  const examId = Number(req.params.examId)
  if (isNaN(examId)) {
    res.status(400).end()
    return;
  }
  try {
    const result = await pool.query("INSERT INTO question (exam_id, question_text) VALUES ($1,$2) RETURNING question_id", [examId, req.body.text])
    res.status(201).send(result.rows[0].question_id)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = examsRouter