// const Post = require('../models/post');
// const User =require('../models/user')

// module.exports.home = function (req, res) {
//   // return res.end('<h1>EXPRESS IS UP !!!!</h1>');
//   // console.log(req.cookies);
//   // res.cookie('user_id', 25);

// //   Post.find({})
// //     .then((posts) => {
// //       return res.render('home', {
// //         title: 'Codeial: Home',
// //         posts: posts,
// //       });
// //     })

// //populate the user of each post

//     Post.find({})
//     .populate('user')
//     .populate({
//       path:'comments',
//       populate:{
//         path:'user'
//       }
//     })
//     .exec()
//     .then((posts) => {
//       User.find({})
//       .then((users)=>{
//         return res.render('home', {
//           title: 'Codeial: Home',
//           posts: posts,
//           all_users:users
//         });
//       })
      
//     })
   
// };


const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
  try {
    // Fetch all posts and populate user for each post and user for each comment
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .exec();

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
