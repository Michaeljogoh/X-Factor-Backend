const express = require("express");
const router = express.Router();
const talentController = require("../controller/talent.controller");
const storage =require('../lib/multer');
const {verifyToken} = require('../middleware/authorization')




router.get("/",  talentController.getAllTalents);
router.get("/:id", talentController.getByIdTalents);
router.post("/create",  storage.single("file"), talentController.createTalents);
router.delete("/:id",  talentController.deleteTalents);


module.exports = router;
