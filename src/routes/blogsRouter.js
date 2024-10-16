const { Router } = require("express");
const controller = require("../controllers/blogsController");
const middleware = require("../middleware/blogsMiddleware");
const generalMiddleware = require("../middleware/generalMiddleware");
const router = Router();

router.get("/", controller.getBlogs);
router.put("/:id", middleware.blogFinder, controller.likeBlog);

router.use(generalMiddleware.tokenExtractor, generalMiddleware.userExtractor);

router.post("/", controller.createBlog);
router.delete("/:id", middleware.blogFinder, controller.deleteBlog);

module.exports = router;
