import sendResponse from "../utils/response.util.js";
import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      company,
      experience,
    } = req.body;
    console.log(req.body);

    // Check for missing fields
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !company ||
      !experience
    ) {
      return sendResponse(res, 400, null, "All fields are required.");
    }

    const userId = req.userId;

    // Create new job entry
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((req) => req.trim()), // Trim spaces
      salary: Number(salary),
      location,
      jobType,
      position,
      company,
      experience,
      createdBy: userId,
    });

    return sendResponse(res, 201, job, "New Job Created Successfully");
  } catch (error) {
    console.error("Error creating job:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // Construct the query for search
    const query = {
      $or: [
        {
          title: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    };

    // Find jobs based on the query
    const jobs = await Job.find(query).populate({
      path: "company",
    });

    // Check if jobs array is empty
    if (!jobs) {
      return sendResponse(res, 404, null, "No Jobs Found");
    }

    return sendResponse(res, 200, jobs, "Jobs Found");
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return sendResponse(res, 400, null, "Job ID is required.");
    }

    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return sendResponse(res, 404, null, "Job Not Found");
    }

    return sendResponse(res, 200, job, "Job Found");
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const adminPostedJob = async (req, res) => {
  try {
    const adminId = req.userId;

    // Check if adminId is provided
    if (!adminId) {
      return sendResponse(res, 400, null, "Admin ID is required.");
    }

    // Find jobs posted by the admin
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
    });

    // Check if jobs array is empty
    if (!jobs) {
      return sendResponse(res, 404, null, "No Jobs Found for this Admin");
    }

    // Return found jobs
    return sendResponse(res, 200, jobs, "Jobs Found");
  } catch (error) {
    // Log error and return a server error response
    console.error("Error fetching jobs posted by admin:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
