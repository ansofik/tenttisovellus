const express = require('express')
const fs = require('fs').promises;
const cors = require('cors')
const app = express()
/* const https = require('https') */
const port = 8080;
  
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log("received a GET request")
    const readData = async () => {
        try {
            const data = await fs.readFile('examdata.json', { encoding: 'utf8', flag: 'r' })
            console.log(data)
            res.send(data)
        } catch (error) {
            res.send("error", error)
        }
    }
    readData()
})

const checkUser = (req, res, next) => {
    console.log(req.body.userdata)
    const readUserData = async () => {
        try {
            const users = JSON.parse(await fs.readFile('userdata.json', { encoding: 'utf8', flag: 'r' }))
            console.log(users)
            const match = users.filter(user => user.username === req.body.userdata.username
                && user.password === req.body.userdata.password && user.isAdmin === true)
            console.log(match)
            if (match.length === 1) {
                next();
                return;
            }
            res.send("fail: password doesnt match or not admin")
        } catch (error) {
            console.log("Failed to read user data", error)
        }
    }
    readUserData()
}

app.post('/', checkUser, (req, res) => {
    console.log("received a POST request")
    console.log(req.body)
    const writeData = async () => {
        try {
            console.log("writing")
            await fs.writeFile('examdata.json', JSON.stringify(req.body.data))
            res.send("Data saved")
        } catch (error) {
            res.send("error", error)
        }
    }
    writeData()
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
