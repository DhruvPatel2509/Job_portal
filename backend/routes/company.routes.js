import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controller/company.controller.js";

import { auth } from "../middleware/auth.middleware.js";

const companyRouter = express.Router();

companyRouter.post("/registerCompany", auth, registerCompany);
companyRouter.get("/getCompany", auth, getCompany);
companyRouter.get("/getCompany/:id", auth, getCompanyById);
companyRouter.put("/updateCompany/:id", auth, updateCompany);

export default companyRouter;
