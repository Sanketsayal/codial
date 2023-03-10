const Post=require('../models/post')
const Comment=require('../models/comment')

module.exports.create=function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post',err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
}

module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({
                post:req.params.id
            },function(err){
                return res.redirect('/');
            })
        }
        else{
            return res.redirect('/')
        }
    })
}