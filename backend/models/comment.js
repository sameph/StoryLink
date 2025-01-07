// models/Post.js
const PostSchema = new mongoose.Schema({
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
      },
    ],
  });
