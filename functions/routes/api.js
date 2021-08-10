const {Router} = require("express");
// eslint-disable-next-line new-cap
const router = Router();
const controller = require("../controller/api");
const guard = require("../middleware/auth");

router.get("/me", [guard.isAuth], controller.isMe);
router.get("/products", [guard.isAuth], controller.getAllProducts);
router.post("/products", [guard.isAuth], controller.insertProduct);
router.get("/products/:id", [guard.isAuth], controller.getProduct);
router.update("/products/:id", [guard.isAuth], controller.updateProduct);
router.delete("/products/:id/delete", [guard.isAuth], controller.deleteProduct);

module.exports = router;
