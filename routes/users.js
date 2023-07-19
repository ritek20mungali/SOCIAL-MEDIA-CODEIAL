const express=require('express');
const router=express.Router();
const passport =require('passport');
//require it from controllers and assing it to a const
const {profile,signin,signup,create,createSession,destroysession} =require('../controllers/user_controller');

//getting the controller and assing it the route
router.get('/profile',passport.checkAuthentication,profile);

router.get('/sign-up',signup);

router.get('/sign-in',signin);

router.post('/create',create);

//use passport as a mmiddle wareto authenticate
 router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
    ),createSession);

    router.get('/sign-out',destroysession);

module.exports=router;
 