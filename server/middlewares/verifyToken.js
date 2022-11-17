const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  const decodedToken = jwt.verify(token, 'secretkeyappearshere')
  if (!token || !decodedToken.id) {
    res.status(401).json({
      success: false,
      message: "Error, token not provided or invalid"
    })
  }
  req.decoded = decodedToken.id
  next()
}

module.exports = verifyToken