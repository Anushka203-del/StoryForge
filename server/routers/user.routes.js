const {register} = require("../controllers/user.controller");
const {login} = require("../controllers/user.controller");
const {logout} = require("../controllers/user.controller");
const verifyjwt = require("../middlewares/auth.middleware");
const {generateNewAccessToken} = require("../controllers/user.controller");
const {change_password} = require("../controllers/user.controller");
const {checkNameUniqueness} = require("../controllers/user.controller");
const {Router} = require("express");     
const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyjwt,logout);
router.route("/generateNewAccessToken").post(generateNewAccessToken);
router.route("/changePassword").post(change_password);
router.route("/checkUsername").post(checkNameUniqueness);
module.exports = router;

