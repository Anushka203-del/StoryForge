const { Router } = require("express");
const verifyjwt = require("../middlewares/auth.middleware")
const { ChapterAddition, voteChapter, getChapter } = require("../controllers/chapter.controller");
const is_canon = require("../utils/is_canon");
const router = Router();

router.route("/chapterAddition").post(verifyjwt, ChapterAddition);
router.route("/voteChapter").post(verifyjwt, voteChapter);
router.route("/getChapter").post(verifyjwt, getChapter);

router.route("/isCanon").post(is_canon);
module.exports = router;