const express = require('express');
/* const fs = require('fs').promises; */
const cors = require('cors');
const bodyparser = require('body-parser');
const { Pool } = require('pg')
const app = express()
const port = 8080

/* const { query } = require('express') */

const pool = new Pool({
  user: 'sofia',
  host: 'localhost',
  database: 'examdb',
  password: 'admin',
  port: 5432,
})

app.use(cors())
app.use(express.json())
/* app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json()) */


app.get('/exams', async (req, res) => {
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

app.get('/exams/:examId', async (req, res) => {
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

app.get('/exams/:examId/questions/', async (req, res) => {
    console.log("received get request for question of exam")
    const examId = Number(req.params.examId)
    try {
        const result = await pool.query('SELECT * FROM question WHERE exam_id=$1', [examId])
        console.log(result)
        res.send(result.rows)
    } catch (err) {
        console.log(err);
        res.status(404).end()
    }
})

app.get('/exams/:examId/questions/:questionId/answeroptions', async (req, res) => {
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

app.post('/exams', async (req, res) => {
    console.log("post for new exam")
    console.log(req.body)
    try {
        const result = await pool.query("INSERT INTO exam (name, published) VALUES ($1,$2)", [req.body.name, req.body.published])
        //console.log(result)
        res.send("new exam saved")
    } catch (err) {
        res.status(500).send(err)   
    }
})

app.post('/exams/:examId/questions', async (req, res) => {
    const examId = Number(req.params.examId)
    try {
        const result = await pool.query("INSERT INTO question (exam_id, text) VALUES ($1,$2)", [examId, req.body.text])
        res.send("new question saved")
    } catch (err) {
        res.status(500).send(err)   
    }
})

app.post('/exams/:examId/questions/:questionId/answeroptions', async (req, res) => {
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

app.put('/exams/:examId', async (req, res) => {
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

app.put('/exams/:examId/questions/:questionId', async (req, res) => {
    console.log("put request to update question")
    const questionId = Number(req.params.questionId)
    try {
        const result = await pool.query("UPDATE question SET text=$1 WHERE question_id=$2", [req.body.text, questionId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

app.put('/exams/:examId/questions/:questionId/answeroptions/:answeroptionId', async (req, res) => {
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


app.delete('/exams/:examId', async (req, res) => {
    const examId = Number(req.params.examId)
    try {
        const result = await pool.query("DELETE FROM exam WHERE exam_id=$1", [examId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

app.delete('/exams/:examId/questions/:questionId', async (req, res) => {
    const questionId = Number(req.params.questionId)
    try {
        const result = await pool.query("DELETE FROM question WHERE question_id=$1", [questionId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})

app.delete('/exams/:examId/questions/:questionId/answeroptions/:answeroptionId', async (req, res) => {
    const answerOptionId = Number(req.params.questionId)
    try {
        const result = await pool.query("DELETE FROM answer_option WHERE answer_option_id=$1", [answerOptionId])
        res.status(204).end()
    } catch (err) {
        res.status(404).send(err) 
    }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


/* app.get('/', (req, res) => {
    console.log("received a GET request")
    const readData = async () => {
        try {
            const data = await fs.readFile('examdata.json', { encoding: 'utf8', flag: 'r' })
            console.log(data)
            res.send(data)
        } catch (error) {
            res.send("error", error)
        }
    }
    readData()
})

const checkUser = (req, res, next) => {
    console.log(req.body.userdata)
    const readUserData = async () => {
        try {
            const users = JSON.parse(await fs.readFile('userdata.json', { encoding: 'utf8', flag: 'r' }))
            console.log(users)
            const match = users.filter(user => user.username === req.body.userdata.username
                && user.password === req.body.userdata.password && user.isAdmin === true)
            console.log(match)
            if (match.length === 1) {
                next();
                return;
            }
            res.send("fail: password doesnt match or not admin")
        } catch (error) {
            console.log("Failed to read user data", error)
        }
    }
    readUserData()
}

app.post('/', checkUser, (req, res) => {
    console.log("received a POST request")
    console.log(req.body)
    const writeData = async () => {
        try {
            console.log("writing")
            await fs.writeFile('examdata.json', JSON.stringify(req.body.data))
            res.send("Data saved")
        } catch (error) {
            res.send("error", error)
        }
    }
    writeData()
}) */
