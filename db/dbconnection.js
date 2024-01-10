const mysql2 = require('mysql2');
const pg = require("pg");
require("dotenv").config()
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
      dialectModule: pg, // Needed to fix sequelize issues with WebPack
      host: process.env.DB_HOST,
      port: 5432,
      dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
      }    
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        "Connection has been established successfully to Database MySql."
      );
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
module.exports = sequelize