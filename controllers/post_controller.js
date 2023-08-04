const Post=require('../models/post')
const Comment=require('../models/comment')
const nodemailer=require('nodemailer')

module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
        // if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post:post,
        //             userName:req.user.name
        //         },
        //         message:'post created'
        //     })
        // }
        // req.flash('success','Post Created!!')
        
    }catch(err){
        console.log('error in creating a post',err);
            return res.redirect('/');
    }
    
}

module.exports.destroy=async function(req,res){
    try {
        let post=await Post.findById(req.params.id);
        
        if(post.user==req.user.id){
            post.deleteOne();
            Comment.deleteMany({
                post:req.params.id
            })
            // if(req.xhr){
            //     req.flash('success','Post Deleted!!');
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:'post deleted succesfully'
            //     })
            // }
            
            return res.redirect('/')
        }
        else{
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
    
}