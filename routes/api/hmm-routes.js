const router = require("express").Router();
const {
  getAllHmms,
  getHmmById,
  addHmm,
  updateHmm,
  removeHmm,
  addRetort,
  removeRetort,
} = require("../../controllers/hmm-control");

router.route("/").get(getAllHmms);

router.route("/:userId").post(addHmm);

router
  .route("/:userId/:hmmId")
  .get(getHmmById)
  .put(updateHmm)
  .delete(removeHmm)
  .post(addRetort);

  router.route('/:userId/:hmmId/:retortId').delete(removeRetort, (req, res) => {
    res.json({ message: 'Retort removed from hmm!' });
  });

   removeRetort = async (req, res) => {
    try {
      const { hmmId, retortId } = req.params;
      const updatedHmm = await Hmm.findByIdAndUpdate(
        hmmId,
        { $pull: { retorts: { _id: retortId } } },
        { new: true, runValidators: true }
      );
      if (!updatedHmm) {
        return res.status(404).json({ message: 'No hmm found with this id!' });
      }
      res.json(updatedHmm);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  
  module.exports = {
    getAllHmms,
    getHmmById,
    addHmm,
    updateHmm,
    removeHmm,
    addRetort,
    
  }

module.exports = router;
