const pool = require('../db.js')
const express = require('express')
const { Router } = require('express')
const router = express.Router()

router.post('/delete_exams', async (req, res) => {
    try {
        await pool.query('BEGIN')
        await pool.query('DELETE FROM option')
        await pool.query('DELETE FROM question')
        await pool.query('DELETE FROM exam')
        await pool.query('COMMIT')

        res.status(204).end()

      } catch (err) {
        await pool.query('ROLLBACK')
        res.status(500).send(err)
      }
})

module.exports = router