const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path')
const avatar_Path=path.join('/uploads/users/avatar')

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',avatar_Path))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

userSchema.statics.uploadedAvatar=multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath=avatar_Path;
const User=mongoose.model('User',userSchema);
module.exports=User;