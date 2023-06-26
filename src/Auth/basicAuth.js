'use strict'
const {useraccount} = require('../models/index')
const userChecker = require('../models/user.model')
const bcrypt = require('bcrypt')
const base64 = require('base-64')
module.exports = async (req, res, next) => {
    if (req.headers.authorization ){

        let EncCredentials = req.headers.authorization.split(" ").pop();
        const [username,password] = base64.decode(EncCredentials).split(":")
        console.log(username,password)
        let user = await useraccount.findOne({where:{username}});
        
        userChecker.Checker(user,password).then(data => {
            req.user = data;
            next()
        }).catch(err => next(err))
       
        
    } else {
        next('please enter a username and a password')
    }
}