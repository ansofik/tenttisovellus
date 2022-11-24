const pool = require('../db.js')
const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const loginRouter = express.Router()

loginRouter.post('/', async (req, res, next) => {
  console.log('logging in', req.body)
  const { username, password } = req.body

  let existingUser = null;
  let passwordMatches = false;
  try {
    let result = await pool.query('SELECT account_id, username, password FROM account WHERE username=$1', [username])
    console.log('result', result)
    if (result.rowCount > 0) {
      result = result.rows[0]
      existingUser = { id: result.account_id, username: result.username, password: result.password }
      passwordMatches = await bcrypt.compare(password, existingUser.password)
    }
  } catch (err) {
    res.status(500).send(err)
  }

  if (!existingUser || !passwordMatches) {
    return res.status(404).json({
      error: 'Incorrect username or password'
    })
  }
  
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username},
      'secretkeyappearshere',
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(err)
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      username: existingUser.username,
      token: token
    }
  })
})


module.exports = loginRouter