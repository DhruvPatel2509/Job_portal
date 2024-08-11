import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./utils/db.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/user", userRouter);
/*
http://localhost:8000/api/v1/user/register
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running At ${PORT}`);
});

dbConnect();
