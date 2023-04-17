const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// for storing session info in db
const MongoStore= require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
   
    // where should server look for css file
    prefix:'/css'
}))


// reading through post request
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));



app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);











// app.set('view engine','ejs');
app.set('views','./views');
app.set('view engine','ejs');

// mongo store is used to store session cookie in db
app.use(session({
    name:'codeial',
    // todo change the secret before deployment in production mode
    secret:'blahsomething',
    

    // if identity of user not established , then no need to store additional data in session cookie
    saveUninitialized:false,

    // if data is stored, in session cookie and if no modification done, then also no need to save data again
    resave:false,
    cookie:{
        // in miliseconds
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/codeal_development',autoRemove:'disabled' }),
    // store:new MongoStore({
    //     mongooseConnection:db,
    //     autoRemove:'disabled'
    // },
    function(err){
        console.log(err  || 'connect-mongodb setup ok');

    }
    
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);


// use express router, if any request comes in then handle the route using router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err)
    {
        // console.log('error in connecting to server',err);

        // or using interpolation, for accessing var directly in string
        console.log(`Error in running the server  :${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
})







