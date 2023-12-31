const User =require('../models/user')
module.exports.profile=function(req,res){
    // return res.end('<h1>USER PROFILE</h1>');
    return res.render('users_profile',{
        title:"user_profile"
     })
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id)
    //     .then(user=>{
    //               if(user){
    //                 res.render('users_profile',{
    //                   title:"User Profile",
    //                   user:user
    //                 })
    //               }
    //     })
    //     // .catch(err=>{

    //     // })
    // }else{
    //   return res.redirect('/users/sign-in');
    // }
}

module.exports.signup=function(req,res){
    
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
      title:"Codeial|| Sign up"
  })

}

//render this page in sign up
module.exports.signin=function(req,res){

  if(req.isAuthenticated()){
   return  res.redirect('/users/profile');
  }

    return res.render('user_sign_in',{
        title:"Codeial|| Sign in"
    })
}

//get  the sign up data
// module.exports.create=function(req,res){
//     if(req.body.password != req.body.confirm_password){  //in body all the name in ejs file u can acessees
//         return res.redirect('back');
//     }
//     User.findOne({email:req.body.email},function(err,user){
//     if(err){
//         console.log('error in finding the user in signing up');
//         return;
//     }
//     if(!user){
//         User.create(req.body,function(err,user){
//             if(err){
//                 console.log('error in creating the user while signing up');
//                 return;
//             }
//             return res.redirect('/users/sign-in');
//         })
//     }else{
//         return res.redirect('back');
//     }
   
//     });

// }

module.exports.create = function(req, res) {
    if (req.body.password !==req.body.confirm_password) {
      return res.redirect('back');
    }
  
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return User.create(req.body);
        } else {
          return Promise.reject('User already exists');
        }
      })
      .then(user => {
        return res.redirect('/users/sign-in');
      })
      .catch(err => {
        console.log('Error in creating or finding the user:', err);
        return res.redirect('back');
      });
  };
  
//sign in and create a session for user
// module.exports.createSession=function(req,res){
//     //find  the user 
    
//     //handle user found

//     //handle mismatching of passwords which dont match

//     //handle session creation

//     //handle if user not found

//     User.findOne({ email: req.body.email })
//     .then(user=>{
//         if(user){
//             if(user.password!==req.body.password){
//                 return res.redirect('back');
//             }

//             res.cookie('user_id',user.id);
//             return res.redirect('/users/profile');
//         }else{
//             return res.redirect('back');
//         }
//     })
//     .catch(err=>{
//         console.log('Error in finding the user in sign in:', err);
//         return;
//     })


// }

//sign in and create session for the user
module.exports.createSession=function(req,res){
        return res.redirect('/');
}

module.exports.destroysession = function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log('Error during logout:', err);
      // Handle the error
    } else {
      // Handle the successful logout
      return res.redirect('/');
    }
  });
};
