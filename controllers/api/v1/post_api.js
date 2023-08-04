const Post=require('../../../models/post')
const Comment=require('../../../models/comment.js')

module.exports.index=async function(req,res){

    let post=await Post.find()
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

    return res.json(200,{
        message:'list of v1 post',
        posts:post
    })
}

module.exports.destroy=async function(req,res){
    try {
        let post=await Post.findById(req.params.id);
        
        if(post.user==req.user.id){
            post.deleteOne();
            Comment.deleteMany({post:req.params.id})
            
            
            return res.json(200,{message:'post deleted'})
        }
        else{
            return res.json(401,{
                message:'you are not allowed to delete this post'
            })
        }
    } catch (error) {
        console.log(error);
        return res.json(500,{message:'internal server error'})
    }
    
}