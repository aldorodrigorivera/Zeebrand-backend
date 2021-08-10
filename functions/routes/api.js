const {Router} = require("express");
// eslint-disable-next-line new-cap
const router = Router();
const controller = require("../controller/api");
const guard = require("../middleware/auth");

router.get("/me", [guard.isAuth], controller.isMe);

module.exports = router;
