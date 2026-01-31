const FollowModel = require("../models/Follow.model");

// FOLLOW USER
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentUserId = req.user.id || req.user._id;

    if (currentUserId.toString() === userId.toString()) {
      return res.status(400).json({ message: "Cannot Follow Yourself" });
    }

    const existing = await FollowModel.findOne({
      follower: currentUserId,
      following: userId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already following" });
    }

    const follow = await FollowModel.create({
      follower: currentUserId,
      following: userId,
    });

    res.status(200).json({ message: "User followed successfully", follow });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UNFOLLOW USER
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentUserId = req.user.id || req.user._id;

    const follow = await FollowModel.findOneAndDelete({
      follower: currentUserId,
      following: userId,
    });

    if (!follow) {
      return res.status(404).json({ message: "Not following this user" });
    }

    res.status(200).json({ message: "User Unfollowed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};