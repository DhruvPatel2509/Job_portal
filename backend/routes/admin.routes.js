import express from "express";
import { editUser } from "../controller/admin.controller.js";

const adminRouter = express.Router();

adminRouter.put("/editUser/:userId", editUser);

export default adminRouter;
