const Post = require('../models/post');

module.exports.home = function (req, res) {
  // return res.end('<h1>EXPRESS IS UP !!!!</h1>');
  // console.log(req.cookies);
  // res.cookie('user_id', 25);

//   Post.find({})
//     .then((posts) => {
//       return res.render('home', {
//         title: 'Codeial: Home',
//         posts: posts,
//       });
//     })

//populate the user of each post

    Post.find({})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    .exec()
    .then((posts) => {
      return res.render('home', {
        title: 'Codeial: Home',
        posts: posts,
      });
    })
   
};
