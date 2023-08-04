const nodemailer=require('../config/nodemailer');

exports.newComment=(comment)=>{

    let htmlString=nodemailer.renderTemp({comment:comment},'/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from:'snktsayal@gmail.com',
        to:comment.user.email,
        subject:'new comment',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log(err);
        }
    })
}