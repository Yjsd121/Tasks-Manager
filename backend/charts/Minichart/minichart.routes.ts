import express from "express";
import * as controller from "./MinichartData.controller.js";

const router = express.Router();

router.get("/:name", controller.MinichartTaskview);

export default router;
