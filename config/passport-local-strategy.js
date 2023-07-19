const passport=require('passport');
const LocalStrategy =require('passport-local').Strategy;

const User =require('../models/user');

//findint the user and authenticate it
passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  // find the user and establish the identity
  User.findOne({ email: email })
      .then(user => {
          if (!user || user.password !== password) {
              console.log('Invalid username/password');
              return done(null, false);
          }
          return done(null, user);
      })
      .catch(err => {
          console.log('Error in finding user --> passport', err);
          return done(err);
      });
}));


//serelizing the user toddecide which key is to be kept in cookies
//user.id ko cookies me rakh leta hai jo ki encrypted ke from me cookie me dikhta hai jo middleware hmne dala hia index.js me 
passport.serializeUser(function(user,done){
  done(null,user.id);
})

//deserilize the user from the key in the cookies
passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      console.log('Error in finding user --> passport', err);
      done(err);
    });
});

//check the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in ,then pass on the request to the next function(controller action)
   if(req.isAuthenticated()){
    return next();
   }
   //if user is not signed in 
   return res.redirect('/users/sign-in');

}


passport.setAuthenticatedUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the currently signed-in user from the session cookies, and we are sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};


module.exports =passport;
