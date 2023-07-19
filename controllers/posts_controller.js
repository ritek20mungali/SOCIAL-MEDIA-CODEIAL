const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => {
      console.log('Post created successfully');
      return res.redirect('back');
    })
    .catch((err) => {
      console.log('Error in creating a post:', err);
      return res.redirect('back');
    });
};


module.exports.destroy = function (req, res) {
  Post.findById(req.params.id)
    .then((post) => {
      //.id means converting the obj id to string
      if (post.user == req.user.id) {
        post.deleteOne(); // Use deleteOne() to remove a single document
        Comment.deleteMany({ post: req.params.id })
          .then(() => {
            return res.redirect('back');
          })
          .catch((err) => {
            console.log('Error deleting comments:', err);
            return res.redirect('back');
          });
      } else {
        return res.redirect('back');
      }
    })
    .catch((err) => {
      console.log('Error finding post:', err);
      return res.redirect('back');
    });
};
