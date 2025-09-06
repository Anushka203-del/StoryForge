const {
    register,
    login,
    logout,
    generateNewAccessToken,
    change_password,
    checkNameUniqueness,
    updateReadProgress,
    getUserDrafts,
    saveOrUpdateDraft,
    voteChapter,
    addToLibrary
} = require("../controllers/user.controller");
const verifyjwt = require("../middlewares/auth.middleware");
const { Router } = require("express");
const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyjwt, logout);
router.route("/generateNewAccessToken").post(generateNewAccessToken);
router.route("/changePassword").post(change_password);
router.route("/check-username").get(checkNameUniqueness);
router.route("/update-read-stats").post(verifyjwt, updateReadProgress)
router.route("/get-user-drafts").get(verifyjwt, getUserDrafts)
router.route("/save-or-update-draft").post(verifyjwt, saveOrUpdateDraft)
router.route("/vote-chapter").post(verifyjwt, voteChapter)
router.route("/add-to-library").post(verifyjwt, addToLibrary)

module.exports = router;

