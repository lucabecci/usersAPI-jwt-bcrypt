const { Router } = require("express");
const verifyToken = require("../controllers/verifyToken");
const router = Router();
//routes
const { register, login, profile } = require("../controllers/auth.controller");
//register
router.post("/signup", register);
//login
router.post("/signin", login);
//perfil
router.get("/profile", verifyToken, profile);

//exportando
module.exports = router;
