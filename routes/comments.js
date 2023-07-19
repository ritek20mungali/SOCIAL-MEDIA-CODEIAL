const express=require('express');
const router=express.Router();
const passport =require("passport");

const {create, destroy} =require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,create);

router.get('/destroy/:id',passport.checkAuthentication,destroy);

module.exports=router;