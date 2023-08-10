const Post = require('../models/post');
const Comment = require('../models/comment');
const Like=require('../models/like');

module.exports.create = async function (req, res) {
  try{
   let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    })

    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post
        },
        message:"Post created !!"
      });
    }
    req.flash('sucess','POST PUBLISHED SUCESSFULLY');
      return res.redirect('back');
  }
  catch{
    req.flash('error',err);
      return res.redirect('back');
  }
  
};


// module.exports.destroy = function (req, res) {
//   Post.findById(req.params.id)
//     .then((post) => {
//       //.id means converting the obj id to string
//       if (post.user == req.user.id) {
//         post.deleteOne(); // Use deleteOne() to remove a single document
//         Comment.deleteMany({ post: req.params.id })
//           .then(() => {
//             return res.redirect('back');
//           })
//           .catch((err) => {
//             console.log('Error deleting comments:', err);
//             return res.redirect('back');
//           });
//       } else {
//         return res.redirect('back');
//       }
//     })
//     .catch((err) => {
//       console.log('Error finding post:', err);
//       return res.redirect('back');
//     });
// };


module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
        
      //changes::delete the associated likes for tgebpost and all its comments like stoo 

      await Like.deleteMany({likeable:post,onModel:'Post'});
      await Like.deleteMany({_id:{$in:post.comments}});

      post.remove();
      // await post.deleteOne(); 
      // Use deleteOne() to remove a single document
      
      await Comment.deleteMany({ post: req.params.id });
         
      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:"POST DELETED !!"
        });
      }


      req.flash('sucess','POST AND ASSOCIATES COMMENTS DELEATED: ');
      return res.redirect('back');
    } else {
      req.flash('error','YOU CANNOT DELETE THE POST: ');
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error',err);
    return res.redirect('back');
  }
};

