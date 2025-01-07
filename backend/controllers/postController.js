const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user.id;
    const filePath = req.file.path; // Assuming Multer handles file uploads

    const post = new Post({ user: userId, caption, filePath });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
