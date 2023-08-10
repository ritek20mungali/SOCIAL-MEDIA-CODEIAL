const Like =require('../models/like');
const Comment =require('../models/comment');
const Post =require('../models/post');
module.exports.toggleLike = async function(req, res) {
    try {
        let likeable;
        let deleted = false;

        if (req.query.type === 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // If a like already exists, delete it; otherwise, create a new like
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();
             existingLike.deleteOne();  // Use await here
            deleted = true;
        } else {
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.status(200).json({  // Use res.status().json() instead of res.json()
            message: "Request Successful !!!!!!",
            data: {
                deleted: deleted
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({  // Use res.status().json() instead of res.json()
            message: 'Internal server error'
        });
    }
};