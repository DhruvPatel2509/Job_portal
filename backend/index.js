import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";

dotenv.config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: true, // Allows requests from any origin
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allows cookies or other credentials to be sent
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRoute);
/*
http://localhost:8000/api/v1/user/register
http://localhost:8000/api/v1/company/registerCompany
http://localhost:8000/api/v1/job/postjob
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running At ${PORT}`);
});

dbConnect();
