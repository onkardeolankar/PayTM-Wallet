const mongoose = require('mongoose');
const {Account} = require('../config/dbSchema');
const {authMiddleware} =  require('../config/auth');
const express = require('express');
const router = express.Router();

router.get('/balance', authMiddleware, async (req,res)=>{
    const account = await Account.findOne({
        userID : req.userID 
    });
    res.send({
        balance : account.balance
    })
});

router.post("/transfer", authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const{amount,to} = req.body;

    const account = await Account.findOne({userID: req.userID}).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        res.send({
            statusCode : 401,
            message : "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userID : to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        res.send({
            statusCode: 401,
            message: "Invalid Account"
        })
    } 

    await Account.updateOne({ userID: req.userID }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userID: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.send({
        message: "Transfer successful"
    });
})

module.exports = router;



