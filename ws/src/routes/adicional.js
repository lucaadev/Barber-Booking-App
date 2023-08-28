const {
  newAdicionalController,
  getAdicionalController,
  getAllAdicionaisController,
  updateAdicionalController,
  deleteAdicionalController
} = require("../controller/adicional");


const router = require("express").Router();

router.post("/", newAdicionalController);
router.get("/:salaoId", getAdicionalController);
router.get("/", getAllAdicionaisController);
router.put("/:id", updateAdicionalController);
router.delete("/:id", deleteAdicionalController);

module.exports = router;