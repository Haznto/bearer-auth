'use strict';

const useraccounts = require('../models/user.model');
const {useraccount} = require('../models/index')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET;

module.exports = async (req, res ,next) => {
  if(req.headers.authorization) {
    // console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization.split(' ').pop();
        console.log(token)
        const parsedToken = jwt.verify(token, SECRET);
        
        const user = await useraccount.findOne({where: {username: parsedToken.username}});
        if(user) {
          req.user = user;
          next()
        } else {
          throw new Error('Invalid Token');
        }
    } catch(err){
        next(err);
    }
    // console.log(parsedToken)
  } else try {
    throw new Error('Invalid Token')
  } catch (err){
    next(err)
  }
    
}
