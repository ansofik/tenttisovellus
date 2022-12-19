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

  console.log('exam', req.body.answers)
  const answers = req.body.answers

  let points = 0;

  // maxPoints equals number of questions
  let maxPoints = 0;
  
  for (const questionId in answers) {
    maxPoints++;
    const answersOfQuestion = answers[questionId]
    let options;
    try {
      const result = await pool.query('SELECT option_id, correct FROM option WHERE question_id=$1', [questionId])
      options = result.rows
    } catch (err) {
      res.status(500).end()
      return
    }

    let addPoint = true
    options.forEach(async option =>  {
      const selected = answersOfQuestion[option.option_id]
      const answerCorrect = selected === option.correct
      if (!answerCorrect) {
        addPoint = false
      }
      const values = [takenExamId, option.option_id, answerCorrect, selected ]
      try {
        await pool.query('INSERT INTO answer (taken_exam_id, option_id, correct, selected) VALUES ($1,$2,$3,$4)', values)
      } catch (err) {
        res.status(500).end()
        return
      }
    })
    if (addPoint === true) points++
  }

  const values = [points, maxPoints, new Date(), takenExamId]

  try {
    const result = await pool.query("UPDATE taken_exam SET points=$1, max_points=$2, return_time=$3 WHERE taken_exam_id=$4 RETURNING points, max_points maxpoints", values)
    if (result.rowCount > 0) {
      console.log(result.rows)
      res.status(200).send((result.rows[0]))
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
  }

  try {
    let result = await pool.query('SELECT correct FROM option WHERE option_id=$1', [req.body.optionId])
    const correct = result.rows[0].correct
    const values = [takenExamId, req.body.questionId, req.body.optionId, correct]
    result = await pool.query('INSERT INTO answer (taken_exam_id, question_id, option_id, correct) VALUES ($1,$2,$3,$4) RETURNING answer_id', values)
    res.status(201).send(result.rows[0].answer_id)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = takenExamsRouter