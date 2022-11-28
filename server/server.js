const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express()
const verifyToken = require('./middlewares/verifyToken')
const isAdmin = require('./middlewares/isAdmin')
const port = 8080

const examsRouter = require('./controllers/exams')
const questionsRouter = require('./controllers/questions')
const optionsRouter = require('./controllers/options')
const takenExamsRouter = require('./controllers/takenExams')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

app.use('/exams', verifyToken, examsRouter)
app.use('/questions', verifyToken, isAdmin, questionsRouter)
app.use('/options', verifyToken, isAdmin, optionsRouter)
app.use('/takenexams', verifyToken, takenExamsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

/* https.createServer(
  {
    key: fs.readFileSync('./security/server.key'),
    cert: fs.readFileSync('./security/server.crt'),
  },
  app
).listen(port, () => {
  console.log(`Server running on port ${port}`)
}) */

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
