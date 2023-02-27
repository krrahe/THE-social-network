const { Hmm, User } = require("../models");

const hmmController = {
  getAllHmms: async (_, res) => {
    try {
      const hmms = await Hmm.find()
        .populate({
          path: "retorts",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(hmms);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  getHmmById: async ({ params }, res) => {
    try {
      const hmm = await Hmm.findById(params.hmmId)
        .populate({
          path: "retorts",
          select: "-__v",
        })
        .select("-__v");
      if (!hmm) {
        res.status(404).json({ message: "No hmm found with this id!" });
        return;
      }
      res.json(hmm);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  updateHmm: async ({ params, body }, res) => {
    try {
      const updatedHmm = await Hmm.findOneAndUpdate(
        { _id: params.hmmId },
        body,
        { new: true, runValidators: true }
      );
      if (!updatedHmm) {
        res.status(404).json({ message: "No hmm found with this id!" });
        return;
      }
      res.json(updatedHmm);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  addHmm: async ({ params, body }, res) => {
    try {
      const newHmm = await Hmm.create(body);
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { hmms: newHmm._id } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(newHmm);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  addRetort: async ({ params, body }, res) => {
    try {
      const updatedHmm = await Hmm.findOneAndUpdate(
        { _id: params.hmmId },
        { $push: { retorts: body } },
        { new: true, runValidators: true }
      );
      if (!updatedHmm) {
        res.status(404).json({ message: "No hmm found with this id!" });
        return;
      }
      res.json(updatedHmm);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  removeHmm: async ({ params }, res) => {
    try {
      const deletedHmm = await Hmm.findOneAndDelete({ _id: params.hmmId });
      if (!deletedHmm) {
        res.status(404).json({ message: "No hmm found with this id!" });
        return;
      }
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { hmms: params.hmmId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = hmmController;
