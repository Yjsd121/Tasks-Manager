import express from "express";
import * as controller from "./Auth.controller.js";

const router = express.Router();

router.post("/login", controller.authlogin);
router.get("/verify", controller.verify);

export default router;