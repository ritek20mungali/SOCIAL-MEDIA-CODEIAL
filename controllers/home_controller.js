


const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
  try {
    // Fetch all posts and populate user for each post and user for each comment
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        //populate a like for comment and posts
        path: 'comments',
        populate: {
          path: 'user',
        },
        populate: {
          path: 'likes',
        }
      }).populate('likes');

    // Fetch all users
    const all_users = await User.find({});

    // Render the home view with the posts and users data
    return res.render('home', {
      title: 'Codeial: Home',
      posts: posts,
      all_users: all_users,
    });
  } catch (err) {
    console.log('Error:', err);
    return res.redirect('back');
  }
};
