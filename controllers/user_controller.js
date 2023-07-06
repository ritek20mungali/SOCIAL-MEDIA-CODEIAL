module.exports.profile=function(req,res){
    // return res.end('<h1>USER PROFILE</h1>');
    return res.render('users_profile',{
        title:"user_profile"
     })
}