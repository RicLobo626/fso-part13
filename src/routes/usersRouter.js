const { Router } = require("express");
const controller = require("../controllers/usersController");

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUser);
router.put("/:username", controller.updateUsername);

module.exports = router;
