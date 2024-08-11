import { sendResponse } from "../utils/response.util.js";
import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return sendResponse(res, 400, null, "Company Name Is Required");
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return sendResponse(res, 400, null, "You Can't Register Same Comapany");
    }
    console.log(req.id);

    company = await Company.create({
      name: companyName,
      userId: req.userId,
    });

    return sendResponse(res, 201, company, "Company Registered Successfully");
  } catch (error) {
    console.error("Error registering company:", error); // Changed to console.error for better logging
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
