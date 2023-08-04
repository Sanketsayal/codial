const express=require('express')
const router=express.Router();

router.use('/postapi',require('./post'));

module.exports=router;