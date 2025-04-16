const User = require('../models/userModel')
const mongoose = require('mongoose')
//login user

const loginUser=async(req,res)=>{
    res.json({mssg:'login success'})
}

//signup user
const sinupUser=async(req,res)=>{
    const {email,password}= req.body;
    try{
const user = await User.signup(email,password);
res.status(200).json({email,user});
    }catch(error){

res.status(400).json({error:error.message})
    }
    res.json({mssg:'login success'})
}

module.exports={
    loginUser,
    sinupUser   
}