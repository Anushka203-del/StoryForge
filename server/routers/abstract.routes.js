const { Router } = require("express");
const {
    abstractGeneratorController,
    getAbstracts
} = require("../controllers/abstract.controller")
const verifyjwt = require("../middlewares/auth.middleware");
const router = Router();

router.route("/abstractGenerator").post(verifyjwt, abstractGeneratorController);
router.route("/get-abstracts").get(abstractGeneratorController);


module.exports = router;