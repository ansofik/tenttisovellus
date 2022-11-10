const pool = require('../db.js')
const express = require('express')
const questionsRouter = require('./questions.js')
const examsRouter = express.Router()

examsRouter.use('/:examId/questions', questionsRouter)

examsRouter.get('/', async (req, res) => {
    console.log("received get request for exams")
    try {
        const result = await pool.query('SELECT * FROM exam')
        console.log(result)
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
        console.log(result)
        res.send(result.rows[0])
    } catch (err) {
        console.log(err);
        res.status(404).end()
    }
})

examsRouter.post('/', async (req, res) => {
    console.log("post for new exam")
    console.log(req.body)
    try {
        const result = await pool.query("INSERT INTO exam (name, published) VALUES ($1,$2)", [req.body.name, req.body.published])
        //console.log(result)
        res.status(201).end()
    } catch (err) {
        res.status(500).send(err)   
    }
})

examsRouter.put('/:examId', async (req, res) => {
    console.log("put request to update exam")
    const examId = Number(req.params.examId)
    const values = [req.body.name, req.body.published, examId]
    try {
        const result = await pool.query("UPDATE exam SET name=$1, published=$2 WHERE exam_id=$3", values)
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

examsRouter.delete('/:examId', async (req, res) => {
    const examId = Number(req.params.examId)
    try {
        const result = await pool.query("DELETE FROM exam WHERE exam_id=$1", [examId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

module.exports = examsRouter