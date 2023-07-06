const express=require('express');
const router=express.Router();

//require it from controllers and assing it to a const
const usercontroller =require('../controllers/user_controller');

//getting the controller and assing it the route
router.get('/',usercontroller.profile);

module.exports=router;
 