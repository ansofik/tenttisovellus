const pool = require('../db.js')
const express = require('express')
const examsRouter = express.Router()

examsRouter.get('/', async (req, res) => {
  console.log("received get request for exams")
  try {
    const result = await pool.query('SELECT exam_id, name, published FROM exam ORDER BY exam_id')
    console.log(result.rows)
    res.send(result.rows)
  } catch (err) {
    console.log(err)
    res.status(404).end()
  }
})

examsRouter.get('/:examId', async (req, res) => {
  console.log("received get request for exam by id")
  const examId = Number(req.params.examId)
  try {
    const result = await pool.query('SELECT * FROM exam WHERE exam_id=$1', [examId])
    if (result.rowCount > 0) {
      res.send(result.rows[0])
    } else {
      console.log('no exam matches given id')
      res.status(404).end()
    }
  } catch (err) {
    console.log(err);
    res.status(500).end()
  }
})

examsRouter.post('/', async (req, res) => {
  console.log("post request for new exam")
  const values = [req.body.name, req.body.published]
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
  const values = [req.body.name, req.body.published, examId]
  try {
    const result = await pool.query("UPDATE exam SET name=$1, published=$2 WHERE exam_id=$3", values)
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
  const examId = Number(req.params.examId)
  try {
    const result = await pool.query("DELETE FROM exam WHERE exam_id=$1", [examId])
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      console.log('no exam matches given id')
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

examsRouter.get('/:examId/questions', async (req, res) => {
  console.log("received get request for questions of an exam")
  const examId = Number(req.params.examId)
  console.log('examId', examId)
  try {
    const result = await pool.query('SELECT * FROM question WHERE exam_id=$1', [examId])
    if (result.rowCount > 0) {
      res.send(result.rows)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.log(err);
    res.status(500).end()
  }
})

examsRouter.post('/:examId/questions', async (req, res) => {
  const examId = Number(req.params.examId)
  try {
    const result = await pool.query("INSERT INTO question (exam_id, text) VALUES ($1,$2)", [examId, req.body.text])
    res.status(201).end()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = examsRouter