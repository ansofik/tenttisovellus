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
    console.log('get request for user by id')
    const userId = req.params.userId
    try {
        const result = await pool.query('SELECT account_id, username, name FROM account WHERE account_id =$1', [userId])
        if (result.rowCount > 0) {
            res.send(result.rows[0])
        } else {
            console.log('no user matches given id')
            res.status(404).end()
        }
    } catch (err) {
        console.log(err)
        res.status(404).end()
    }
})

usersRouter.post('/', async (req, res) => {
    console.log('post request for new user')
    const b = req.body;
    const values = [b.username, b.password, b.name, b.isAdmin]
    try {
        const result = await pool.query('INSERT INTO account (username, password, name, is_admin) VALUES ($1,$2,$3,$4) RETURNING account_id', values)
        console.log('inserted rows', result.rowCount)
        console.log('id of inserted user', result.rows[0])
        res.status(201).send(result.rows[0].account_id)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

usersRouter.put('/:userId', async (req, res) => {
    console.log("put request to update user")
    const userId = Number(req.params.userId)
    const b = req.body;
    const values = [b.username, b.name, b.password, userId]
    try {
        const result = await pool.query("UPDATE account SET username=$1, name=$2, password=$3 WHERE account_id=$4", values)
        if (result.rowCount > 0) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    } catch (err) {
        console.log(err)
        res.status(404).send(err) 
    }
})


module.exports = usersRouter

