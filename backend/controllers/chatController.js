const Chat = require('../models/chat');

exports.getChatHistory = async (req, res) => {
  const { userId, otherUserId } = req.query;

  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
