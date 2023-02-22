const Post=require('../models/post');

module.exports.home= function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:'codial | Home',
    //         posts:posts
    //     })
    // });

    //populate the user 
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        if(err){
            console.log('error in fetching posts',err);
        }
        return res.render('home',{
            title:'codial | Home',
            posts:posts
        });
    });
    
};
