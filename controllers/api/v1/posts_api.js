const Post=require('../../../models/post')
const Comment = require('../../../models/comment');
module.exports.index= async function(req,res){

    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })

return res.json(200,{
    message:"Lists of posts",
    posts:posts
})
}

module.exports.destroy = async function (req, res) {
    try {
      const post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
          post.remove();
          await Comment.deleteMany({ post: req.params.id });
         return  res.json(200,{
          message:'POST AND ASSOCIATES COMMENTS DELEATED: '});

        }else{

          return  res.json(401,{
            message:'You cannot delete the post'});
        }
      
  
    } catch (err) {
      console.log("*****8"+err);
      return res.json(500,{
        message:"INternal server error"
      });
    }
  };