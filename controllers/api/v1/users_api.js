
const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){

    try{
        const user =User.findOne({email:req.body.email});
        if(!user || user.password!= req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            })
        }

        return res.json(200,{
            mesage:"Sign in sucessfull,here is your token , please keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
            }
        })

    }catch (err) {
        console.log("*****8"+err);
        return res.json(500,{
          message:"INternal server error"
        });
      }
           
  //  return res.redirect('/');
}