const pool = require('../db.js')
const answerOptionsRouter = require('express').Router({mergeParams: true})

answerOptionsRouter.get('/', async (req, res) => {
    console.log("received get request for answer options of question")
    const examId = Number(req.params.examId)
    const questionId = Number(req.params.questionId)
    try {
        const result = await pool.query('SELECT * FROM answer_option WHERE question_id=$1', [questionId])
        console.log(result)
        res.send(result.rows)
    } catch (err) {
        console.log(err);
        res.status(404).end()
    }
})

answerOptionsRouter.post('/', async (req, res) => {
    console.log('add answer option');
    const questionId = Number(req.params.questionId)
    const query = {
        text: 'INSERT INTO answer_option (question_id, text, correct) VALUES ($1,$2,$3)',
        values: [questionId, req.body.text, req.body.correct],
    }
    console.log(query)
    try {
        const result = await pool.query(query)
        res.send("new answer option saved")
    } catch (err) {
        res.status(500).send(err)   
    }
})

answerOptionsRouter.put('/:answeroptionId', async (req, res) => {
    console.log("put request to update answer option")
    const ansOpId = Number(req.params.answeroptionId)
    const values = [req.body.text, req.body.correct, ansOpId]
    try {
        const result = await pool.query("UPDATE answer_option SET text=$1, correct=$2 WHERE answer_option_id=$3", values)
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

answerOptionsRouter.delete('/:answeroptionId', async (req, res) => {
    const answerOptionId = Number(req.params.questionId)
    try {
        const result = await pool.query("DELETE FROM answer_option WHERE answer_option_id=$1", [answerOptionId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

module.exports = answerOptionsRouter