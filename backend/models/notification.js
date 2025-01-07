// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient
  type: { type: String, enum: ['like', 'comment', 'follow'], required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Optional for post-related notifications
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who triggered the notification
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', NotificationSchema);
