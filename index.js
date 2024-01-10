
const PORT = 3001;
const express = require("express");
const server = express()
const sequelize = require("./db/dbconnection")
require("dotenv").config()
const bodyParser = require("body-parser");
const cors = require("cors")
 global.sequelize = sequelize
server.use(express.json())
server.use(cors({
  origin: "*"
}))

const userRoute = require("./routes/user")
server.get("/",(req,res)=>{
  res.send("hello world");
})
server.use("/user",userRoute)
server.get("/hello",(req,res)=>{
  res.send("hello world , this is the beginnig of new year");
})


server.listen(PORT,(error)=>{
    if(!error){

      console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    }
    else{
      console.log("Error occurred, server can't start", error);
    }
}

)

// module.exports = count_signup