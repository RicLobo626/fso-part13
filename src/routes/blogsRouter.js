const { Router } = require("express");
const controller = require("../controllers/blogsController");
const middleware = require("../middleware/blogsMiddleware");

const router = Router();

router.get("/", controller.getBlogs);
router.post("/", controller.createBlog);
router.delete("/:id", middleware.blogFinder, controller.deleteBlog);

module.exports = router;
