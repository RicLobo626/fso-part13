const { Router } = require("express");
const controller = require("../controllers/logoutController");
const generalMiddleware = require("../middleware/generalMiddleware");

const router = Router();

router.use(generalMiddleware.tokenExtractor, generalMiddleware.userExtractor);
router.post("/", controller.logout);

module.exports = router;
