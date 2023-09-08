import express from "express";
import {
  createUser,
  cancelBooking,
  bookVisit,
  getAllBookings,
  toFav,
  getAllFavorites,
} from "../controllers/userCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
//id : booking object from the list of booking in user object
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav/", getAllFavorites);

export { router as userRoute };
