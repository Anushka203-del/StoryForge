const { Router } = require("express");
const {
    getAllBlocks,
    addBlock,
    generateChapterSegment
} = require("../controllers/creator_studio.controller")
const verifyjwt = require("../middlewares/auth.middleware");
const router = Router();

router.route("/get-all-blocks").get(verifyjwt, getAllBlocks);
router.route("/add-block").post(verifyjwt, addBlock);
router.route("/generate-chapter-segment").post(verifyjwt, generateChapterSegment);


module.exports = router;