const pool = require('../db.js')
const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const usersRouter = express.Router()

// create new user
usersRouter.post('/', async (req, res, next) => {
    const { email, password } = req.body

    const saltRounds = 10
    try {
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const values = [email, passwordHash, false]
      result = await pool.query('INSERT INTO account (email, password, is_admin) VALUES ($1,$2,$3) RETURNING account_id id', values)
    } catch (err) {
      return next(err);
    }
  
    const userId = result.rows[0].id
    let token;
    try {
      token = jwt.sign(
        { userId: userId, email: email },
        'secretkeyappearshere',
        { expiresIn: '1h' }
      )
    } catch (err) {
      return next(err)
    }
  
    res.status(201).json({
        success: true,
        data: {
          userId: userId,
          email: email, token: token
        }
      })
  })

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

