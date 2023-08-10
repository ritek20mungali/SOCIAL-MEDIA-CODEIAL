const express=require('express');
const router=express.Router();
const passport =require('passport');
//require it from controllers and assing it to a const
const {profile,signin,signup,create,createSession,destroysession, update} =require('../controllers/user_controller');

//getting the controller and assing it the route
router.get('/profile/:id',passport.checkAuthentication,profile);
router.post('/update/:id',passport.checkAuthentication,update);

router.get('/sign-up',signup);

router.get('/sign-in',signin);

router.post('/create',create);

//use passport as a mmiddle wareto authenticate
 router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
    ),createSession);

    router.get('/sign-out',destroysession);

    router.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }))

    router.get('/auth/google/callback',passport.authenticate('google',{
        failureRedirect:'/users/sign-in'
    }),createSession);

module.exports=router;
 