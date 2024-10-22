const { Router } = require("express");
const controller = require("../controllers/readinglistsController");
const generalMiddleware = require("../middleware/generalMiddleware");

const router = Router();

router.use(generalMiddleware.tokenExtractor, generalMiddleware.userExtractor);
router.post("/", controller.addBlogToReadingList);
router.put("/:id", controller.toggleRead);
module.exports = router;
