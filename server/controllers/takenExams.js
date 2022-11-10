const pool = require('../db.js')
const express = require('express')
const answersRouter = require('./answers.js')
const takenExamsRouter = express.Router()

takenExamsRouter.use('/:takenExamId/answers', answersRouter)

takenExamsRouter.get('/', async (req, res) => {
    console.log("received get request for taken exams")
    const examId = req.query.exam
    const userId = req.query.user
    try {
        let result = null
        if (examId !== undefined) {
            result = await pool.query('SELECT * FROM taken_exam WHERE exam_id=$1', [examId])
        } else if (userId !== undefined) {
            result = await pool.query('SELECT * FROM taken_exam WHERE account_id=$1', [userId])
        } else {
            result = await pool.query('SELECT * FROM taken_exam')
        }
        res.send(result.rows)
    } catch (err) {
        console.log(err)
        res.status(404).end()
    }
})

takenExamsRouter.get('/:takenExamId', async (req, res) => {
    console.log("received get request for taken exam by id")
    const takenExamId = Number(req.params.takenExamId)
    try {
        const result = await pool.query('SELECT * FROM taken_exam WHERE taken_exam_id=$1', [takenExamId])
        res.send(result.rows[0])
    } catch (err) {
        console.log(err);
        res.status(404).end()
    }
})

takenExamsRouter.post('/', async (req, res) => {
    console.log("post for new taken exam")
    console.log(req.body)
    values = [req.body.examId, req.body.accountId, new Date()]
    try {
        const result = await pool.query("INSERT INTO taken_exam (exam_id, account_id, start_time) VALUES ($1,$2,$3) RETURNING taken_exam_id id", values)
        console.log(result.rows[0].id)
        res.location('/takenexams/' + result.rows[0].id)
        res.status(201).end()
    } catch (err) {
        res.status(500).send(err)   
    }
})

takenExamsRouter.put('/:takenExamId', async (req, res) => {
    console.log("put request to update taken exam")
    const takenExamId = Number(req.params.takenExamId)
    const values = [req.body.points, new Date(), takenExamId]
    try {
        const result = await pool.query("UPDATE taken_exam SET points=$1, return_time=$2 WHERE taken_exam_id=$3", values)
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

takenExamsRouter.delete('/:takenExamId', async (req, res) => {
    const takenExamId = Number(req.params.takenExamId)
    try {
        const result = await pool.query("DELETE FROM taken_exam WHERE taken_exam_id=$1", [takenExamId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

module.exports = takenExamsRouter