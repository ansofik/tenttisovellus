const pool = require('../db.js')
const express = require('express')
const userExamsRouter = express.Router()

userExamsRouter.get('/', async (req, res) => {
    console.log("received get request for exams")
    try {
      const result = await pool.query('SELECT exam_id id, name FROM exam WHERE published=true ORDER BY exam_id')
      console.log(result.rows)
      res.send(result.rows)
    } catch (err) {
      console.log(err)
      res.status(500).end()
    }
  })

  userExamsRouter.get('/:examId', async (req, res) => {
    console.log("received get request for an exam by id")
    const examId = Number(req.params.examId)
    if (isNaN(examId)) {
      res.status(400).end()
      return;
    }
  
    const query = {
      text: 'SELECT e.exam_id, e.name, q.question_id, q.question_text, o.option_id, o.option_text FROM exam e LEFT JOIN question q ON e.exam_id = q.exam_id LEFT JOIN option o ON q.question_id = o.question_id WHERE e.exam_id=$1',
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
        const newOption = { optionId: curr.option_id, optionText: curr.option_text, selected:false}
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

  module.exports = userExamsRouter