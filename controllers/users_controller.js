
const User=require('../models/user')
const fs=require('fs');
const path=require('path');
module.exports.profile=async function(req,res){
    try {
        let user=await User.findById(req.params.id);
        res.render('user_profile',{
            title:'profile',
            user_profile:user
        });
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.update=async function(req,res){
    console.log(req.body,req.file)

    if(req.user.id==req.params.id){
        try {
            let user=await User.findByIdAndUpdate(req.params.id,req.body);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('multer error',err);
                }
                user.name=req.body.name;
                console.log(req.file)
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }                    
                    //saving the path to the uploaded file in user's avatar
                    user.avatar=User.avatarPath+'/'+req.file.filename
                }
                user.save();
                
            })
            return res.redirect('/');
        } catch (error) {
            console.log(error);
        }
        
            
    }else{
        req.flash('error','Unauthorised');
        return res.status(401).send('unauthorized');
    }    
    
    
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile/');
    }
    return res.render('user_sign_up',{
        title:"Codial|sign up"
    })
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        return res.render('user_sign_in',{
            title:"Codial|sign in"
        })
    }
    
}

module.exports.create=async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('/');
    }
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user){
            try{
                let user=await User.create(req.body);
                return res.redirect('/users/sign-in');
            }catch(err){
                console.log('error in creating user');
                return;
            }
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error in finding user');
            return;
    }
}

module.exports.createSession=function(req,res){
    req.flash('success','logged in successfully')
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    });
    req.flash('success','logged out successfully')

    return res.redirect('/');
}