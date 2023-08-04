const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user')
//authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback:true
    },
    async function(req,email,password,done){
        //find a user and establish the identity
        try {
            let user=await User.findOne({email:email});
            if(!user || user.password!=password){
                req.flash('error','incorrect username/password');
                return done(null,false);
            }
            return done(null,user);
        } catch (error) {
            done(error);
        }
              
    }

))

//serializing the user to decide which key to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing user
passport.deserializeUser(async function(id,done){
    try{
        let user=await User.findById(id);
        return done(null,user)
    }catch(err){
        console.log('error in finding user-->passport');
        return done(err);
    }
   
});
//check if authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //if authenticated
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current user 
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;