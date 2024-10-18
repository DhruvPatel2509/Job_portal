import sendResponse from "../utils/response.util.js";
import { Company } from "../models/company.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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
    const { id: companyId } = req.params;
    const { name, description, website, location } = req.body;
    const file = req.file;

    // Validate the companyId
    if (!companyId) {
      return sendResponse(res, 400, null, "Company ID is required");
    }

    // Find the company by ID
    const company = await Company.findById(companyId);
    if (!company) {
      return sendResponse(res, 404, null, "Company Not Found");
    }

    // Handle file upload if provided
    if (file) {
      const uploadResult = await uploadOnCloudinary(file.path);
      if (uploadResult) {
        company.logo = uploadResult.secure_url;
        company.logoOriginalName = file.originalname;
      }
    }

    // Update company fields only if they exist in the request body
    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    // Save the updated company
    await company.save();

    // Send success response
    return sendResponse(res, 200, company, "Company Updated Successfully");
  } catch (error) {
    console.error("Error updating company:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id: companyId } = req.params;

    if (!companyId) {
      return sendResponse(res, 400, null, "Company ID is required");
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return sendResponse(res, 404, null, "Company Not Found");
    }

    // Delete the company
    await Company.findByIdAndDelete(companyId);

    return sendResponse(res, 200, null, "Company deleted successfully");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
