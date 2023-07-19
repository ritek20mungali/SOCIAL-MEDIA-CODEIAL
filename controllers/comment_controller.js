const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
       Post.findById(req.body.post)
       .then((post)=>{
        if(post){
            Comment.create({
                comment :req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            .then((comment)=>{
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
       })

}

// module.exports.destroy = function (req, res) {
//     Comment.findById(req.params.id)
//       .then((comment) => {
//         //.id means converting the obj id to string
//         if (comment.user == req.user.id) {
//             let postId =comment.post;
//           comment.deleteOne(); // Use deleteOne() to remove a single document

//           Post.findByIdAndUpdate(postId,{ $pull : { comments :req.params.id}})
//           .then((post)=>{
//             return res.redirect ('back');
//           })
          
//         } else{
//             return res.redirect ('back');
//         }
//       })
      
//   };
  


module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (!comment) {
        // If comment is not found, handle the error
        return res.redirect('back');
      }

      if (comment.user.toString() === req.user.id) {
        // If the user is authorized to delete the comment
        let postId = comment.post;

        // Delete the comment (using deleteOne() to remove a single document)
        comment
          .deleteOne()
          .then(() => {
            // Update the post by removing the comment ID from the comments array
            return Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
          })
          .then(() => {
            return res.redirect('back'); // Redirect back after successful deletion and update
          })
          .catch((err) => {
            console.log('Error updating post:', err);
            return res.redirect('back');
          });
      } else {
        // If the user is not authorized to delete the comment, redirect back
        return res.redirect('back');
      }
    })
    .catch((err) => {
      console.log('Error finding comment:', err);
      return res.redirect('back');
    });
};
