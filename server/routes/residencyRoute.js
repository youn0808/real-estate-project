import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/resdCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

//create new residency
router.post("/create", createResidency);
//get all residency
router.get("/allresidency", getAllResidencies);
//get a specific residency by giving id
router.get("/:id", getResidency);

export { router as residencyRoute };
