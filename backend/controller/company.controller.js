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

export const getCompany = async (req, res) => {
  try {
    const userId = req.userId;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return sendResponse(res, 404, null, "Companies Not Found");
    }

    // Send a successful response with the companies data
    return sendResponse(res, 200, companies, "Companies Found");
  } catch (error) {
    console.error("Error fetching companies:", error); // Log the error for debugging
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return sendResponse(res, 404, null, "Company Not Found");
    }

    return sendResponse(res, 200, company, "Company Found");
  } catch (error) {
    console.error("Error fetching company:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;

    if (!companyId) {
      return sendResponse(res, 400, null, "Company ID is required");
    }

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });

    if (!company) {
      return sendResponse(res, 404, null, "Company Not Found");
    }

    return sendResponse(res, 200, company, "Company Updated Successfully");
  } catch (error) {
    console.error("Error updating company:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
