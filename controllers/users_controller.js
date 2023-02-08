const User=require('../models/user')
module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:'profile',
                    user:user
                })
            }
            else{
                return res.redirect('users/sign-in');
            }
        })
    }
    else{
        res.redirect('users/sign-in')
    }
    
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
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in signing in');
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                return res.redirect('/');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile')
        }
        else{
            return res.redirect('/')
        }
    })
    //handle user found 
    //handle user not found
}