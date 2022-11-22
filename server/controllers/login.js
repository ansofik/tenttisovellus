const pool = require('../db.js')
const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const loginRouter = express.Router()

loginRouter.post('/', async (req, res, next) => {
  const { email, password } = req.body

  let existingUser = null;
  let passwordMatches = false;
  try {
    let result = await pool.query('SELECT account_id, email, password FROM account WHERE email=$1', [email])
    if (result.rowCount > 0) {
      result = result.rows[0]
      existingUser = { id: result.account_id, email: result.email, password: result.password }
      passwordMatches = await bcrypt.compare(password, existingUser.password)
    }
  } catch (err) {
    res.status(500).send(err)
  }

  if (!existingUser || !passwordMatches) {
    return res.status(401).json({
      error: 'Incorrect email or password'
    })
  }
  
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
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
      email: existingUser.email,
      token: token
    }
  })
})


module.exports = loginRouter