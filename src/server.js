'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const userRouter = require('../src/router/useraccount')
const notFound = require('../src/middleware/404')
const serverErr = require('../src/middleware/500')

app.use(userRouter)
app.use(notFound)
app.use(serverErr)

function start(port) {
    app.listen(port , () => console.log(`up and running on port ${port}`) )
}

module.exports = {
    start,
    app
}