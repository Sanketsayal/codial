const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const expresslayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passort-local-strategy');
const MongoStore=require('connect-mongo');
const { default: mongoose } = require('mongoose');
const sassmiddleware=require('node-sass-middleware');


app.use(sassmiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expresslayout);
//extract style and scripts from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookie
app.use(session({
    name:'codial',
    //change secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        { 
            mongoUrl: 'mongodb://0.0.0.0:27017/codial',
            autoRemove:'disabled' 
        },
        function(err){
            console.log(err||'conect-mongo ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running: ${port}`);
})