const express = require("express");
const router = express.Router();
const talentController = require("../controller/talent.controller");
const storage =require('../lib/multer');
const {verifyToken} = require('../middleware/authorization')




router.get("/", verifyToken, talentController.getAllTalents);
router.get("/:id", verifyToken, talentController.getByIdTalents);
router.post("/create", verifyToken, storage.single("file"), talentController.createTalents);
router.delete("/:id", verifyToken, talentController.deleteTalents);


module.exports = router;
