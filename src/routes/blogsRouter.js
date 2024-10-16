const { Router } = require("express");
const controller = require("../controllers/blogsController");
const middleware = require("../middleware/blogsMiddleware");
const generalMiddleware = require("../middleware/generalMiddleware");
const router = Router();

router.get("/", controller.getBlogs);
router.post("/", generalMiddleware.tokenExtractor, generalMiddleware.userExtractor, controller.createBlog);
router.delete("/:id", middleware.blogFinder, controller.deleteBlog);
router.put("/:id", middleware.blogFinder, controller.likeBlog);

module.exports = router;
