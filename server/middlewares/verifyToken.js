const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log('verifying token')
  const token = req.headers.authorization?.split(' ')[1]
  const decodedToken = jwt.verify(token, 'secretkeyappearshere')
  if (!token || !decodedToken) {
    res.status(401).json({
      success: false,
      message: "Error, token not provided or invalid"
    })
  }
  req.decoded = decodedToken
  next()
}

module.exports = verifyToken