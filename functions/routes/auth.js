const {Router} = require("express");
// eslint-disable-next-line new-cap
const router = Router();
const controller = require("../controller/auth");

router.post("/login", controller.login);
router.post("/singup", controller.singUp);
router.post("/logout", controller.logOut);

module.exports = router;
