const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment')

passport.use(new googleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL
    },

    async function(accessToken,refreshToken,profile,done){

        try {
            let user=await User.findOne({email:profile.emails[0].value});
            console.log(profile);
            if(user){
                return done(null,user);
            }else{
                let user=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                });
                return done(null,user);
            }
        } catch (error) {
            console.log('error in google strategy',error);
        }
    }

))

module.exports=passport;