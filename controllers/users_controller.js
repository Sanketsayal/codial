const User=require('../models/user')
module.exports.profile=function(req,res){
    return res.end('<h1>user profile</>');
}

module.exports.signup=function(req,res){
    return res.render('user_sign_up',{
        title:"Codial|sign up"
    })
}

module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        title:"Codial|sign in"
    })
}

module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('/');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user');
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession=function(req,res){
    
}