const express=require('express')
const router=express.Router();

router.use('/postapi',require('./post'));
router.use('/users',require('./users'));

module.exports=router;