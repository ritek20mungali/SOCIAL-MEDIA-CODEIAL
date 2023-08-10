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

const passportJWT =require('./config/passport-jwt-strategy');
const passportGoogle =require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const flash =require('connect-flash');
const customMware =require('./config/middleware');

//set up an char server to be used with socket .io

//>>>>>>>>>>>>>>>>>>>  SOCKET IO

const http = require('http');
const cors = require('cors'); // Import the cors package
const server = http.Server(app);

app.use(cors()); // Use cors middleware to enable CORS for all routes

// Your other server configuration

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const chatSockets = require('./config/chat_sockets').chatSockets(server); // Pass the server instance to chatSockets


app.use(cors({
  origin: 'http://localhost:8000', // Replace with your frontend's URL
  methods: ['GET', 'POST'], // Allowed HTTP methods
}));


//>>>>>>>>>>>>>>>>>>>





app.use(express.urlencoded());
app.use(cookieParser());


const expresslayouts =require('express-ejs-layouts');

app.use(express.static('./assets'));
//make the uploads path avail to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

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


app.use(flash());
app.use(customMware.setFlash);


//use express router
app.use('/',require('./routes'));

// app.listen(port,function(err){
//     if(err){
//         console.log(`Error on running the server: ${port}`);
//     }
//     console.log(`Server is running on port :: ${port}`);
// });

