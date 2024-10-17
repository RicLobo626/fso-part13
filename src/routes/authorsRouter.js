const { Router } = require("express");
const controller = require("../controllers/authorsController");

const router = Router();

router.get("/", controller.getAuthors);

module.exports = router;
