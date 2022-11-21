const pool = require('../db.js')

const isAdmin = async (req, res, next) => {
  console.log('checking admin rights')
  try {
    const result = await pool.query('SELECT * FROM account WHERE account_id=$1', [req.decoded.userId])
    let admin = result.rows[0].admin
    if (admin) {
      next()
    } else {
      res.status(403).send('Access denied')
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = isAdmin