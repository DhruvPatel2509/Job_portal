import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import sendResponse from "../utils/response.util.js";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;

    // Validate required fields
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return sendResponse(res, 400, null, "Something is Missing");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, null, "User Already Exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Initialize profile photo URL
    let profilePhotoUrl = null;

    if (file) {
      console.log(file);

      // Upload the file to Cloudinary
      const uploadResult = await uploadOnCloudinary(file.path, "ProfilePhoto");

      if (uploadResult) {
        profilePhotoUrl = uploadResult.secure_url;
      } else {
        return sendResponse(res, 500, null, "Failed to upload profile photo");
      }
    }

    // Create new user
    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        bio: "",
        skills: [],
        resume: null,
        resumeOrignalName: "",
        profilePhoto: profilePhotoUrl,
      },
    });

    return sendResponse(
      res,
      201,
      user,
      `Welcome, ${user.fullname}! Your account has been successfully created.`
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate request body
    if (!email || !password || !role) {
      return sendResponse(res, 400, null, "Required fields are missing");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 401, null, "Invalid email or password");
    }

    // Check if the provided role matches the user's role
    if (role !== user.role) {
      return sendResponse(res, 403, null, "Access denied: incorrect role");
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return sendResponse(res, 401, null, "Invalid email or password");
    }

    // Create JWT token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: "1d" });

    // Prepare user response data
    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      token: token,
    };
    // res.cookie("token", token, {
    //   // httpOnly: true, // Prevents JavaScript access
    //   sameSite: "Strict", // Helps prevent CSRF
    //   expires: new Date(Date.now() + 86400000),
    // });

    // Send response with token as a cookie
    return res.status(200).json({
      message: `Welcome back, ${user.fullname}`,
      success: true,
      user: userResponse,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};

export const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.userId;
    const resumeFile = req.files["file"];
    const profilePhoto = req.files["profilePhoto"];

    let user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, 404, null, "User Not Found");
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
    }

    if (resumeFile) {
      const uploadResult = await uploadOnCloudinary(
        resumeFile[0].path,
        "Resume"
      );
      if (uploadResult) {
        user.profile.resume = uploadResult.secure_url;
        user.profile.resumeOrignalName = resumeFile[0].filename;
      }
    }

    if (profilePhoto) {
      const uploadResult = await uploadOnCloudinary(
        profilePhoto[0].path,
        "ProfilePhoto"
      ); // Upload profile photo
      if (uploadResult) {
        user.profile.profilePhoto = uploadResult.secure_url; // Save photo URL
      }
    }

    await user.save();

    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return sendResponse(res, 200, userResponse, "Profile Updated Successfully");
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const retriveUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).send("User not found.");
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return sendResponse(res, 500, null, "Internaal server error");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return sendResponse(res, 200, users, "Users fetched successfully");
  } catch (error) {
    console.error("Error fetching users:", error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found.");

    // Delete all jobs created by the user
    await Job.deleteMany({ createdBy: userId });

    // Delete all applications submitted by the user
    await Application.deleteMany({ applicant: userId });

    // If the user is a recruiter, delete their company and associated jobs
    if (user.role === "recruiter" && user.profile.company) {
      await Job.deleteMany({ company: user.profile.company });
      await Company.findByIdAndDelete(user.profile.company);
    }

    // Finally, delete the user
    await User.findByIdAndDelete(userId);

    return res.status(200).send("User and related data deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send("Internal Server Error.");
  }
};
