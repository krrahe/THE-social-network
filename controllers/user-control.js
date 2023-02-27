const { User, Hmm } = require("../models");

const userController = {
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.find({})
        .populate({
          path: "hmms",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getUserById({ params }, res) {
    try {
      const dbUserData = await User.findOne({ _id: params.id })
        .populate({
          path: "hmms",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async addFriend({ params }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async createUser({ body }, res) {
    try {
      const dbUserData = await User.create(body);
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async updateUser({ params, body }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteUser({ params }, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.id });
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteFriend({ params }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = userController;
