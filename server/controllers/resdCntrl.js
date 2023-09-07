import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  console.log("Create residency");
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Success: Created residency", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Fail : A residency with address already exist");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// // function to get a specific document/residency
// export const getResidency = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   try {
//     const residency = await prisma.residency.findUnique({
//       where: { id },
//     });
//     res.send(residency);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });
