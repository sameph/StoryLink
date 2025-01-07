exports.commentOnPost = async (req, res) => {
    const { id } = req.params; // Post ID
    const { text } = req.body;
    const userId = req.user.id;
  
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
  
      post.comments.push({ user: userId, text });
  
      // Create a notification
      const notification = new Notification({
        user: post.user,
        type: 'comment',
        post: post._id,
        sender: userId,
        message: `${req.user.username} commented on your post.`,
      });
      await notification.save();
  
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
