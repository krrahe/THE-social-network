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

router.route("/:userId/:hmmId/:retortId").delete(removeRetort);

module.exports = router;
