const express = require('express');
const cors = require('cors');
const app = express()
const port = 8080
const examsRouter = require('./controllers/exams')

app.use(cors())
app.use(express.json())

app.use('/exams', examsRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
