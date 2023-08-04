const express=require('express');
const env=require('./config/environment')
const loggor=require('morgan')
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
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo');
// const sassmiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMWare=require('./config/middleware');
const passortGoogle=require('./config/passport-google-oauth-strategy')


//setup the chat server to use with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer)
chatServer.listen(5000)

// if(env.name){
//     app.use(sassmiddleware({
//         src:path.join(__dirname,env.asset_path,'/scss'),
//         dest:path.join(__dirname,env.asset_path,'/css'),
//         debug:true,
//         outputStyle:'expanded',
//         prefix:'/css'
//     }))
// }

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
//make upload path available to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
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
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        { 
            mongoUrl: env.db,
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

app.use(flash());

app.use(customMWare.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running: ${port}`);
})