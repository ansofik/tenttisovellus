const pool = require('../db.js')
const express = require('express')
const takenExamsRouter = express.Router()
const isAdmin = require('../middlewares/isAdmin')

takenExamsRouter.get('/', async (req, res) => {
  console.log("received get request for taken exams")
  const examId = req.query.exam
  const userId = req.query.user
  if (examId !== undefined && isNaN(Number(examId)) || userId !== undefined && isNaN(Number(userId))) {
    res.status(400).end()
    return;
  }
  try {
    let result = null
    if (examId !== undefined) {
      result = await pool.query('SELECT * FROM taken_exam WHERE exam_id=$1', [examId])
    } else if (userId !== undefined) {
      result = await pool.query('SELECT * FROM taken_exam WHERE account_id=$1', [userId])
    } else {
      result = await pool.query('SELECT * FROM taken_exam')
    }
    if (result.rowCount > 0) {
      res.send(result.rows)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

takenExamsRouter.get('/:takenExamId', async (req, res) => {
  console.log("received get request for taken exam by id")
  console.log(req.decoded)
  const takenExamId = Number(req.params.takenExamId)
  if (isNaN(takenExamId)) {
    res.status(400).end()
    return;
  }
  try {
    const result = await pool.query('SELECT * FROM taken_exam WHERE taken_exam_id=$1', [takenExamId])
    if (result.rowCount > 0) {
      res.send(result.rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.log(err);
    res.status(500).end()
  }
})

takenExamsRouter.post('/', async (req, res) => {
  console.log("post for new taken exam")
  console.log(req.body, req.decoded)
  values = [req.body.examId, req.decoded.userId, new Date()]
  try {
    const result = await pool.query("INSERT INTO taken_exam (exam_id, account_id, start_time) VALUES ($1,$2,$3) RETURNING taken_exam_id id", values)
    res.status(201).send(result.rows[0].id)
  } catch (err) {
    res.status(500).send(err)
  }
})

takenExamsRouter.put('/:takenExamId', async (req, res) => {
  console.log("put request to update taken exam")
  let takenExamId = Number(req.params.takenExamId)
  if (isNaN(takenExamId)) {
    res.status(400).end()
    return;
  }

  try {
    const user = await pool.query('SELECT account_id FROM taken_exam WHERE taken_exam_id=$1', [takenExamId])
    if (user.rows[0].account_id !== req.decoded.userId) {
      return res.status(403).end()
    }
  } catch (err) {
    res.status(500).send(err)
    return
  }

  const points = 0;
  const values = [points, new Date(), takenExamId]
  try {

    const result = await pool.query("UPDATE taken_exam SET points=$1, return_time=$2 WHERE taken_exam_id=$3 RETURNING points", values)
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

takenExamsRouter.delete('/:takenExamId', isAdmin, async (req, res) => {
  const takenExamId = Number(req.params.takenExamId)
  if (isNaN(takenExamId)) {
    res.status(400).end()
    return;
  }
  try {
    const result = await pool.query("DELETE FROM taken_exam WHERE taken_exam_id=$1", [takenExamId])
    if (result.rowCount > 0) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

takenExamsRouter.get('/:takenExamId/answers', async (req, res) => {
  console.log("received get request for answers")
  const takenExamId = Number(req.params.takenExamId)
  if (isNaN(takenExamId)) {
    res.status(400).end()
    return;
  }

  try {
    const user = await pool.query('SELECT account_id FROM taken_exam WHERE taken_exam_id=$1', [takenExamId])
    if (user.rows[0].account_id !== req.decoded.userId) {
      return res.status(403).end()
    }
  } catch (err) {
    res.status(500).send(err)
  }

  try {
    const result = await pool.query('SELECT * FROM answer WHERE taken_exam_id=$1', [takenExamId])
    if (result.rowCount > 0) {
      res.send(result.rows)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})

takenExamsRouter.post('/:takenExamId/answers', async (req, res) => {
  console.log('post request to save answer option')
  const takenExamId = Number(req.params.takenExamId)
  if (isNaN(takenExamId)) {
    res.status(400).end()
    return;
  }

  try {
    const user = await pool.query('SELECT account_id FROM taken_exam WHERE taken_exam_id=$1', [takenExamId])
    if (user.rows[0].account_id !== req.decoded.userId) {
      return res.status(403).end()
    }
  } catch (err) {
    res.status(500).send(err)

    const values = [takenExamId, req.body.answerOptionId]
    try {
      const result = await pool.query('INSERT INTO answer (taken_exam_id, answer_option_id) VALUES ($1,$2) RETURNING answer_id', values)
      res.status(201).send(result.rows[0].answer_id)
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

module.exports = takenExamsRouter