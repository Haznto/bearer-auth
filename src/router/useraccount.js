'use strict';
const express = require('express')
const router = express.Router();
const {useraccount} = require('../models/index');
const bcrypt = require('bcrypt')
const base64 = require('base-64')
const basicAuth = require('../Auth/basicAuth')
const bearerAuth = require('../Auth/bearerAuth')



router.post('/signup', handleSignUp)
router.post('/signin',basicAuth, handleSignIn)
router.get('/secretstuff',bearerAuth, handleTokenRout)


async function handleSignUp(req,res){
    try {
        const obj = req.body;
        let hashedPassword = await bcrypt.hash(obj.password,5)
        const addUser = await useraccount.create({
            username: obj.username,
            password: hashedPassword
        })
        res.status(201).json(addUser)
    } catch(err){
        res.status(400).json({
            msg: "bad request"
        })
    }
}
async function handleSignIn(req,res){
    if (req.user) {
        res.status(200).json(req.user)
    } 
}

async function handleTokenRout (req,res) {
    let secretNum = Math.random()*10000000;
    res.status(200).json({
        yourSecretNumber: secretNum
    })
}

module.exports = router;