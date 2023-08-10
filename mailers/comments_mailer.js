const nodeMailer=require('../config/nodemailer');



//another way of exporting a method
exports.newComment =(comment)=>{
             console.log('inside newcomments mailer',comment);
             nodeMailer.sendMail({
                from:'mungaliritik@gmail.com',
                to:'ritek20122000@gmail.com',
                subject:"new comment published",
                html:'<h1> YPU , YOUR COMMENT IS NOW PUBLISHED</h1>'
             }   ,(err,info)=>{
                if(err){
                    console.log('error in sending mail',err);
                    return;
                }
                console.log('comment mail sent',info);
                    return;
             })
}

// transporter.sendMail(this.newComment,(err)=>{
//     if(err){
//         console.log("it has an error",err);
//     }else{
//         console.log("emailhas sent!!!!");
//     }
// })