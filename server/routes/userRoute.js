import express from "express";
import {
  createUser,
  cancelBooking,
  bookVisit,
  getAllBookings,
} from "../controllers/userCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);

export { router as userRoute };
