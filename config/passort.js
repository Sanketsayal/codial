const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user')
//authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email'
    },function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user->passport');
                return done(err);
            }
            if(!user||user.password!=password){
                console.log('Invalid username/Password');
                return done(null,false);
            }
            return done(null,user);
        })
    }

));

//serializing the user to decide which key to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Invalid username/Password');
            return done(err);
        }
        return done(null,user)
    })
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