const nodemailer =require("nodemailer");
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service:'gmail',
    //host:'smtp.gmail.com',
    //port:587,
    auth:{
        user:'mungaliritik@gmail.com',
        pass:'Bighead@123'
    }
});




// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'elenora.gerlach@ethereal.email',
//         pass: 'FjwFUn2KR7mWE1aZ47'
//     }
// });

let renderTemplate =(data,relativePath)=>{
        let mailHTML ;
        ejs.renderFile(
            path.join(__dirname,'../views/mailers',relativePath),
            data,
            function(err,temp){
                if(err){
                    console.log('error in rendering template',err);
                    return;
                }
                mailHTML=temp;
            }
        )

        return mailHTML;
}

// module.exports={
//     transporter:transporter,
//     renderTemplate:renderTemplate
// }

module.exports=transporter;