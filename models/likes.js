const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    likable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'    
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Commment']
    }
},{
    timestamps:true
})

const like=mongoose.model('Like',likeSchema);
module.exports=like;