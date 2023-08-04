const Post=require('../models/post');
const User=require('../models/user')

module.exports.home=async function(req,res){
    try{
        let post=await Post.find()
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        }).populate('likes');
        let user=await User.find({});
        return res.render('home',{
            title:'codial | home',
            posts:post,
            users:user
        })
    }catch(err){
        console.log(err);
    }
      
    
};
