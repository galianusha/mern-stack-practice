const express = require('express');
const router = express.Router();
const {loginUser,
    sinupUser }=require('../controllers/userConroller')



//login ROute
router.post('/login',loginUser)



//signup Route
router.post('/signup',sinupUser)


module.exports= router;