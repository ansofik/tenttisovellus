const pool = require('../db.js')
const answerOptionsRouter = require('./answerOptions.js')
const questionsRouter = require('express').Router({mergeParams: true})

questionsRouter.use('/:questionId/answeroptions', answerOptionsRouter)

questionsRouter.get('/', async (req, res) => {
    console.log("received get request for question of exam")
    const examId = Number(req.params.examId)
    console.log('examId', examId)
    try {
        const result = await pool.query('SELECT * FROM question WHERE exam_id=$1', [examId])
        console.log(result)
        res.send(result.rows)
    } catch (err) {
        console.log(err);
        res.status(404).end()
    }
})

questionsRouter.post('/', async (req, res) => {
    const examId = Number(req.params.examId)
    try {
        const result = await pool.query("INSERT INTO question (exam_id, text) VALUES ($1,$2)", [examId, req.body.text])
        res.status(201).end()
    } catch (err) {
        res.status(500).send(err)   
    }
})

questionsRouter.put('/:questionId', async (req, res) => {
    console.log("put request to update question")
    const questionId = Number(req.params.questionId)
    try {
        const result = await pool.query("UPDATE question SET text=$1 WHERE question_id=$2", [req.body.text, questionId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

questionsRouter.delete('/:questionId', async (req, res) => {
    const questionId = Number(req.params.questionId)
    try {
        const result = await pool.query("DELETE FROM question WHERE question_id=$1", [questionId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

module.exports = questionsRouter