const Comment=require('../models/comment');
const Post=require('../models/post');


module.exports.create=function(req,res){
    console.log(req.body);
    Post.findById(req.body.post,function(err,post){
        // console.log('finding post');
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log(err);
                }

                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
        else{
            console.log(err);
        }
    })
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{
                $pull:{
                    comments:req.params.id
                }
            },function(err,post){
                return res.redirect('/');
            })
        }
        else{
            return res.redirect('/');
        }
    })
}