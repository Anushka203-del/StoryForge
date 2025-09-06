const { Router } = require("express");
const verifyjwt = require("../middlewares/auth.middleware")
const { getBookDetails } = require("../controllers/book.controller")
const router = Router();

router.route("/:bookid").get(getBookDetails)

module.exports = router;