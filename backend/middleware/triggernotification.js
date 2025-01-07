const Notification = require('../models/notification');
const Post = require('../models/Post');

exports.likePost = async (req, res) => {
  const { id } = req.params; // Post ID
  const userId = req.user.id;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);

      // Create a notification
      const notification = new Notification({
        user: post.user, // Post owner
        type: 'like',
        post: post._id,
        sender: userId,
        message: `${req.user.username} liked your post.`,
      });
      await notification.save();
    } else {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
