const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.json(422,{
                message:'Invalid username'
            })
        }

        if(!user||user.password!=req.body.password){
            return res.json(422,{
                message:'Invalid username/password'
            })
        }
        return res.json(200,{
            message:'signin successful',
            data:{
                token: jwt.sign(user.toJSON(),'codial',{expiresIn:100000})
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(500,{message:'internal server error'})
    }
    
}
