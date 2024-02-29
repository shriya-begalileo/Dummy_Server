const express = require('express')
const { postFcmToken } = require('../controllers/fcmTokenController')
const FcmTokenModel = require('../models/fcmToken.model')

const fcmTokenRouter = express.Router()

fcmTokenRouter.get('/',async (req,res)=>{
    const fcmTokens=await FcmTokenModel.find()
    res.send(fcmTokens)
})
fcmTokenRouter.post('/',postFcmToken)




module.exports = {fcmTokenRouter}