const pool = require('../db.js')
const express = require('express')
const answersRouter = express.Router({mergeParams: true})

answersRouter.get('/', async (req, res) => {
    console.log("received get request for answers")
    const takenExamId = Number(req.params.takenExamId)
    try {
        const result = await pool.query('SELECT * FROM answer WHERE taken_exam_id=$1', [takenExamId])
        console.log(result)
        res.send(result.rows)
    } catch (err) {
        console.log(err)
        res.status(404).end()
    }
})

answersRouter.post('/', async (req, res) => {
    const takenExamId = req.params.takenExamId
    const values = [takenExamId, req.body.answerOptionId]
    try {
        const result = await pool.query('INSERT INTO answer (taken_exam_id, answer_option_id) VALUES ($1,$2)', values)
        res.send('new answer saved')
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = answersRouter