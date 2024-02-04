const express = require('express');
const { User, Account } = require('../config/dbSchema');
const jwt = require("jsonwebtoken")
const {JWT_KEY, hashPassword, hashCompare} = require('../config/dbConfig')
const router = express.Router();

router.post("/signup", async(req, res)=>{
    try{
        let users = await User.findOne({username: req.body.username})
        if(users){
            res.send({
                statusCode: 400,
                message : "User already Exists "
            })
        }
            else{
                let hashedPassword = await hashPassword(req.body.password);
                req.body.password = hashedPassword
                const user = await User.create({
                    username: req.body.username,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                })
                const userID = user._id;
                await Account.create({
                    userID,
                    balance : 1 + Math.random() * 1000
                })
                    let token = await jwt.sign(
                        {userID},
                        JWT_KEY,
                        {expiresIn:'1h'}
                        );

                    res.send({
                    statusCode : 200 ,
                    message : " User Created Successfully",
                    token : token
                })
            }
        }
         catch (error) {
            res.send({
                statusCode:500,
                message:"Internal Server Error",
                error
        })
    }
})

router.post("/signin", async(req, res)=>{
    try {
        const { username, password } = req.body;
        let user = await User.findOne({username})
        if(user){
            res.send({
                statusCode:200,
                message:"Login Successfull",
              })
            }
                 let validatePwd = await hashCompare(password,user.password)
                 if(!validatePwd){
                  res.send({
                      statusCode:401,
                      message:"Incorrect password",
                    })
                 }  
            }
            catch (error) {
            res.send({
                statusCode:500,
                message:"Internal Server Error",
                error
            })
        }
    })

module.exports = router;