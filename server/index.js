import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());
app.use(cors());

//start server
app.listen(PORT, () => {
  console.log(`server runs on port ${PORT}`);
});
