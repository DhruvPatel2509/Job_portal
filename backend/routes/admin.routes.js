import express from "express";
import { editUser } from "../controller/admin.controller.js";

const adminRoute = express.Router();

adminRoute.put("/editUser/:userId", editUser);

export default adminRoute;
