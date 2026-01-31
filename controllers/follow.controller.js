const FollowModel = require("../models/Follow.model");

exports.followUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        message: "Cannot Follow Yourself",
      });
    }
    const existing = await FollowModel.findOne({
      follower: req.user._id,
      following: userId,
    });
    if (existing) {
      return res.status(400).json({
        message: "Already following",
      });
    }
    const follow = await FollowModel.create({
      follower: req.user._id,
      following: userId,
    });
    res.status(200).json({
      message: "User follow",
      follow,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//Unfolow user

exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const follow = await FollowModel.findOneAndDelete({
      follower: req.user._id,
      following: userId,
    });
    if (!follow) {
      return res.status(404).json({
        message: "Not following this user",
      });
    }
    res.status(200).json({
      message: "User Unfollowed",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



exports.getFollowers = async (req, res) => {
  try {
    const followers = await FollowModel.find({ following: req.params.userId })
      .populate("follower", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      count: followers.length,
      followers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const following = await FollowModel.find({ follower: req.params.userId })
      .populate("following", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json({ count: following.length, following });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
