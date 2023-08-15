import express from "express";
// , getAllResidencies, getResidency
import { createResidency } from "../controllers/resdCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create", createResidency);
// router.get("/allresd", getAllResidencies)
// router.get("/:id", getResidency)
export { router as residencyRoute };
