import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a new user");

  let { email } = req.body;
  const isUserExist = await prisma.user.findUnique({ where: { email } });

  // When there is no user that use the email exist then create a new user
  if (!isUserExist) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "Create User successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already existed" });
});

// function to book a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { date } = req.body;
  const { id } = req.params;

  try {
    // const alreadyBooked = await prisma.user.findUnique({
    //   where: { email },
    //   select: { bookedVisits: true },
    // });

    // if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
    //   res
    //     .status(400)
    //     .json({ message: "This residency is already booked by you" });
    // } else
    {
      //book residency
      await prisma.user.update({
        where: { email: "test1@gmail.com" },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// // funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // const email = "test1@gmail.com";
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params; //booked object id
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    //get a specific visit reservation from the user
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking does not exist" });
    } else {
      //remove the found visit from the bookvist list
      user.bookedVisits.splice(index, 1);

      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Success: Cancel visit booking ");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// // function to add a resd in favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const testemail = "test1@gmail.com";
  const { rid } = req.params; // residency id

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //if user alread set the residency as favorit then delete and if not set the residency as favorit
    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// // function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  // const { email } = req.body;
  const email = "test1@gmail.com";
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    console.log(favResd);
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});
