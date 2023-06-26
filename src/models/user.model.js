'use strict'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET;
const useraccount = (sequelize,DataTypes) => sequelize.define('useraccount',{
    username: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    token: {
        type: DataTypes.VIRTUAL
    }
})

useraccount.Checker = async function (username,password) {
    if(username){
        const isValid = await bcrypt.compare(password,username.password);
    
        if(isValid){
            const userToken = jwt.sign({username:username.username, password:username.password},SECRET)
            // return username
            return {
                username,
                token:userToken
            }
            
        } else {
            throw new Error('User not Authorized')
        }
    } else {
        throw new Error('User not Found')
    }
    
} 




module.exports = useraccount;