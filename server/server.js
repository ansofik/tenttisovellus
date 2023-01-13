const https = require('https');
const fs = require('fs');
const express = require('express');
const ws = require('ws');
const jwt = require("jsonwebtoken");
const app = express();
const pgFunc = require('./pg_notify');

const cors = require('cors');
const corsOptions = {
  exposedHeaders: 'Etag'
}

const verifyToken = require('./middlewares/verifyToken')
const isAdmin = require('./middlewares/isAdmin')


const examsRouter = require('./controllers/exams')
const userExamsRouter = require('./controllers/userexams')
const questionsRouter = require('./controllers/questions')
const optionsRouter = require('./controllers/options')
const takenExamsRouter = require('./controllers/takenExams')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')

app.use(cors(corsOptions))
app.use(express.json())

app.use('/exams', verifyToken, isAdmin, examsRouter)
app.use('/userexams', verifyToken, userExamsRouter)
app.use('/questions', verifyToken, isAdmin, questionsRouter)
app.use('/options', verifyToken, isAdmin, optionsRouter)
app.use('/takenexams', verifyToken, takenExamsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

const testingRouter = require('./controllers/testing');
app.use('/testing', testingRouter)

const server = https.createServer(
  {
    key: fs.readFileSync('./security/key.pem'),
    cert: fs.readFileSync('./security/cert.pem'),
  },
  app
)

const wss = new ws.Server({ server });
pgFunc.connect()
const clients = [];

wss.on('connection', ws => {
  console.log('connected');
  clients.push(ws);
  ws.authenticated = false;
  
  ws.on('message', message => {
    const msg = JSON.parse(message);
    console.log('message', msg);
    switch (msg.type) {
      case "authenticate":
        const decodedToken = jwt.verify(msg.token, 'secretkeyappearshere');
        if (decodedToken) {
          ws.authenticated = true;
          pgFunc.updateClients(clients.filter(c => c.authenticated === true))
        } else {
          ws.destroy();
        }
    }
  })

  ws.on('close', () => {
    clients.splice(clients.indexOf(ws), 1);
  });
})

const port = 8080;
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

