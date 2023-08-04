const Comment=require('../models/comment');
const Post=require('../models/post');
const mailer=require('../mailers/comment_mailer')
// let queue=require('../config/kue')
// const commentEmailWorker=require('../workers/comment_mail_workers')

module.exports.create=async function(req,res){
    try {
        let post=await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user','name email');
            // mailer.newComment(comment);
            // let job=queue.create('emails',comment).save(function(err){
            //     if(err){
            //         console.log('error is comment worker');
            //     }
            //     console.log('job is enqueued')
            // })
            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             comment : comment,
            //             User : req.user.name,
            //             post:post
            //         },
            //         message:'comment Posted!!'
            //     })
            // }
            res.redirect('/');    
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.destroy=async function(req,res){

    try {
        // console.log(req.params)
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{
                $pull:{
                    comments:req.params.id
                }
            })

            if(req.xhr){

                return res.status(200).json({
                    data :{
                        comment_id : comment.id
                    },
                    message : "Comment Deleted !"
                })
            }
            return res.redirect('/');
        }
        else{
            return res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }

    
}