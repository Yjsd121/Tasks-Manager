import express from "express";
import * as controller from "./Dashboard.controller.js";

const router = express.Router();

router.get("/Totaltask", controller.TotalTasks);
router.get("/Usertask", controller.UsersTaks);
router.get("/Mini", controller.minicards);

export default router;
