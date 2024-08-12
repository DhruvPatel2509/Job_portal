import express from "express";
import {
  adminPostedJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controller/job.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const jobRouter = express.Router();

jobRouter.post("/postjob", auth, postJob);
jobRouter.get("/getAllJob", auth, getAllJobs);
jobRouter.get("/adminPostedJob", auth, adminPostedJob);
jobRouter.get("/getJob/:id", auth, getJobById);

export default jobRouter;
