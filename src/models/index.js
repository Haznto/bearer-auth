'use strict'
const {Sequelize, DataTypes} = require('sequelize')
const DBURL = process.env.NODE_ENV === 'test'? 'sqlite:memory:': process.env.DBURL

let sequelizeOptions = process.env.NODE_ENV === 'production'? {
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    }
}:{}

const sequelize = new Sequelize(DBURL, sequelizeOptions);
const useraccount = require('./user.model')



module.exports = {
    db: sequelize,
    useraccount: useraccount(sequelize, DataTypes)

}