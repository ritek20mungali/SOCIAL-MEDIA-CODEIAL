const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port =8000;
const  db=require('./config/mongoose')
const mongoose =require('mongoose');
//used for session cookie
const session =require('express-session');
const passport =require('passport');
const passportLocal =require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());
app.use(cookieParser());

const expresslayouts =require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expresslayouts);
//extract styles and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
// Create a MongoStore instance for session storage

  

app.use(session({
    name:'codeial',
    //to do cahge the secret before deployment in prod mode
    secret:'blahsomething',
    saveUninitialized:false,// iser has not logged in identity is not est. we dont want to store extra data in session  cookiewe save it as false
    resave:false,//some sort of data is present in seeeion i dont want to save the session cokkie again and again
    cookie:{
        maxAge:(1000*60*100)
    },
    store : new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
      autoRemove: 'disabled'
    }, err => {
      if (err) {
        console.log(err);
      } else {
        console.log('Connect MongoDB setup');
      }
    })
    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error on running the server: ${port}`);
    }
    console.log(`Server is running on port :: ${port}`);
});

