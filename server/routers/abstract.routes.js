const { Router } = require("express");
const abstractGeneratorController = require("../controllers/abstract.controller")
const verifyjwt = require("../middlewares/auth.middleware");
const router = Router();

router.route("/abstractGenerator").post(verifyjwt,abstractGeneratorController);


module.exports = router;