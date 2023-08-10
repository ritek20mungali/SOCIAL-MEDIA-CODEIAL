const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer =require('../mailers/comments_mailer');
const queue =require('../config/kue');
const commentEmailWorker =require('../workers/comment_email_worker');
const Like =require('../models/like');


module.exports.create = async function (req, res) {
  try {
    const postId = req.body.post.trim();
    const post = await Post.findById(postId);

    if (post) {
      const comment = await Comment.create({
        comment: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();

      const populatedComment = await comment.populate('user', 'name');

      // commentsMailer.newComment(populatedComment);

      let job=queue.create('emails',populatedComment).save(function(err){
             if (err){
                console.log('error in sending to the queue',err);
                return;
             }
             console.log('job enqueued',job.id);
      })

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: populatedComment,
          },
          message: 'Comment created',
        });
      }
      req.flash('success', 'Comment published');
      res.redirect('/');
    }
  } catch (err) {
    req.flash('error', err);
    console.log('Error creating comment:', err);
    return;
  }
};


module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      // If comment is not found, handle the error
      return res.redirect('back');
    }

    if (comment.user.toString() === req.user.id) {
      // If the user is authorized to delete the comment
      let postId = comment.post;

      // Delete the comment (using deleteOne() to remove a single document)
      comment.remove();

      // Update the post by removing the comment ID from the comments array
      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });


      //Change ::destrot tghe associates likes fo this comment
      await Like.deleteMany({likeable:comment._id,onModel:'Comment'});

      return res.redirect('back'); // Redirect back after successful deletion and update
    } else {
      // If the user is not authorized to delete the comment, redirect back
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error deleting comment or updating post:', err);
    return res.redirect('back');
  }
};
