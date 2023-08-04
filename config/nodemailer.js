const mailer=require('nodemailer');
const ejs=require('ejs')
const path=require('path')

let transporter=mailer.createTransport({
    service:'gmail',
    port:587,
    secure:false,
    auth:{
        user:'snktsayal@gmail.com',
        pass:'xdmzjclenbcokbuo'
    },
});

let renderTemp=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,Template){
            if(err){
                console.log('err in rendering template',err);
            }
            mailHtml=Template;
        });
    return mailHtml;
}

module.exports={
    transporter:transporter,
    renderTemp:renderTemp
}