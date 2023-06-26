'use strict'
const {useraccount} = require('../src/models/index')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const userRouter = require('../src/router/useraccount')
const notFound = require('../src/middleware/404')
const serverErr = require('../src/middleware/500')

app.get('/', handleUserNow)
app.use(userRouter)
app.use(notFound)
app.use(serverErr)

async function handleUserNow(req,res) {
    const data = await useraccount.findAll()
    // console.log(data[1].token)
    res.status(200).json({
        message: "Welcome to homepage",
        allUsers : data
    })
}
function start(port) {
    app.listen(port , () => console.log(`up and running on port ${port}`) )
}

module.exports = {
    start,
    app
}