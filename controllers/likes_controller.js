const Like=require('../models/likes');
const Post=require('../models/post');
const Comment=require('../models/comment')


module.exports.toggleLike=async function(req,res){
    try {
        let likable;
        let deleted=false;

        if(req.query.type=='Post'){
            likable=await Post.findById(req.query.id).populate('likes');
        }else{
            likable=await Comment.findById(req.query.id).populate('likes');
        }

        let existing=await Like.findOne({
            likable:req.query.id,
            onModel:req.query.type,
            user:req.user.id
        });
        console.log(existing);
        if(existing){
            likable.likes.pull(existing.id);
            likable.save();
            existing.deleteOne()
            deleted=true;
        }
        else{
            let newlike=await Like.create({
                user:req.user.id,
                likable:req.query.id,
                onModel:req.query.type
            })
            likable.likes.push(newlike.id);
            likable.save();
        }
        return res.json(200,{
            message:'request successful',
            data:{
                deleted:deleted
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}