import express from "express";
import * as controller from "./users.controller.js";
import upload from "../middlewares/uploads.middleware.js";

const router = express.Router();

// Get
router.get("/users", controller.getUsers);
router.get("/userid", controller.getuserIDS);
router.get("/Me", controller.gettingMe);

// Post
router.post("/create", upload.single("Img_rute"), controller.createUser);

// Put
router.put("/:id", upload.single("Img_rute"), controller.updateUser);
router.put("/", controller.changeFirstPass);

// Delete
router.delete("/:id", controller.deleteUser);

export default router;
