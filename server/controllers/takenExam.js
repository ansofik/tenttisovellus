const pool = require('../db.js')
const express = require('express')
const takenExamsRouter = express.Router()

takenExamsRouter.get('/', async (req, res) => {
    console.log("received get request for a taken exam")
    const examId = Number(req.query.exam)
    const accountId = Number(req.query.account)
    try {
        const result = await pool.query('SELECT * FROM taken_exam WHERE exam_id=$1 AND account_id=$2', [examId, accountId])
        res.send(result.rows)
    } catch (err) {
        console.log(err)
        res.status(404).end()
    }
})

module.exports = takenExamsRouter