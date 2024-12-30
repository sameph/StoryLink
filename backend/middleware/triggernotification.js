// controllers/userController.js
const User = require('../Models/user');
const Notification = require('../Models/notification');

// Follow a user
exports.followUser = async (req, res) => {
  const { id } = req.params; // User to follow
  const userId = req.user.id;

  if (userId === id) return res.status(400).json({ error: 'You cannot follow yourself' });

  try {
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (!userToFollow.followers.includes(userId)) {
      userToFollow.followers.push(userId);
      currentUser.following.push(id);

      // Create a follow notification
      const notification = new Notification({
        user: id,
        type: 'follow',
        sender: userId,
        message: `${req.user.username} started following you.`,
      });
      await notification.save();

      await userToFollow.save();
      await currentUser.save();
    }

    res.status(200).json({ message: 'User followed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  const { id } = req.params; // User to unfollow
  const userId = req.user.id;

  try {
    const userToUnfollow = await User.findById(id);
    const currentUser = await User.findById(userId);

    userToUnfollow.followers = userToUnfollow.followers.filter((follower) => follower.toString() !== userId);
    currentUser.following = currentUser.following.filter((follow) => follow.toString() !== id);

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({ message: 'User unfollowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
