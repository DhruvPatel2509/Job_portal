import express from "express";
import { registerCompany } from "../controller/company.controller.js";

const companyRouter = express.Router();

companyRouter.post("/registerCompany", registerCompany);

export default companyRouter;
