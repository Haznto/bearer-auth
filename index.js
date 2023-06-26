'use strict'
require('dotenv').config();
const {db} = require('./src/models/index')
const {start , app} = require('./src/server')
let PORT = process.env.PORT || 5000
db.sync().then(()=> {
    start(PORT)
}).catch(err => console.log(err))