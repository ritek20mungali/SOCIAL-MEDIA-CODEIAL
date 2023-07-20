const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
  try{
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    })
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
      await post.deleteOne(); // Use deleteOne() to remove a single document
      await Comment.deleteMany({ post: req.params.id });
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

