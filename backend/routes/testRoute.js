import express from "express";
import testController from "../controllers/testController.js";

const router = express.Router();

router.get("/bonjour", testController.direBonjour);
export default router;
