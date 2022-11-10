const pool = require('../db.js')
const express = require('express')
const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
    console.log('get request for users')
    try {
        const result = await pool.query('SELECT account_id, username, name FROM account')
        res.send(result.rows)
    } catch (err) {
        console.log(err)
        res.status(404).end()
    }
})

usersRouter.get('/:userId', async (req, res) => {
    console.log('get request for user')
    const userId = req.params.userId
    try {
        const result = await pool.query('SELECT account_id, username, name FROM account WHERE account_id =$1', [userId])
        res.send(result.rows)
    } catch (err) {
        console.log(err)
        res.status(404).end()
    }
})

usersRouter.post('/', async (req, res) => {
    console.log('post request for new user')
    const b = req.body
    const values = [b.username, b.password, b.name, b.isAdmin]
    try {
        const result = await pool.query('INSERT INTO account (username, password, name, is_admin) VALUES ($1,$2,$3,$4)', values)
        console.log(result)
        res.status(201).end()
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = usersRouter