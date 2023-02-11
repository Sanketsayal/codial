const User=require('../models/user')
module.exports.profile=function(req,res){
    res.render('user_profile',{
        title:'profile'
    });
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codial|sign up"
    })
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
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
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    });
    return res.redirect('/');
}