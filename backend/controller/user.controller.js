import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import sendResponse from "../utils/response.util.js";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { sendResetOtp } from "../utils/mailSend.js";
import crypto from "crypto";
import { Company } from "../models/company.model.js";
import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

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
      const uploadResult = await uploadOnCloudinary(
        file.buffer,
        file.originalname,
        "ProfilePhoto"
      );

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
        resumeOriginalName: "",
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
    console.error("Registration error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return sendResponse(res, 400, null, "Required fields are missing");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 401, null, "email is not registered");
    }

    if (role !== user.role) {
      return sendResponse(res, 403, null, "Access denied: incorrect role");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return sendResponse(res, 401, null, "Invalid email or password");
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: "1d" });

    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      token: token,
    };

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

    if (resumeFile && resumeFile.length > 0) {
      const uploadResult = await uploadOnCloudinary(
        resumeFile[0].buffer,
        resumeFile[0].originalname,
        "Resume"
      );
      if (uploadResult) {
        user.profile.resume = uploadResult.secure_url;
        user.profile.resumeOrignalName = resumeFile[0].originalname;
      }
    }

    if (profilePhoto && profilePhoto.length > 0) {
      const uploadResult = await uploadOnCloudinary(
        profilePhoto[0].buffer,
        profilePhoto[0].originalname,
        "ProfilePhoto"
      );
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
    console.error("Error updating profile:", error);
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
    return res.status(500).send("Internal server error");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return sendResponse(res, 404, null, "This email is not registered");

    // Check OTP resend cooldown
    if (user.otp && user.otp.sendTime > Date.now()) {
      const waitTime = new Date(user.otp.sendTime).toLocaleTimeString();
      return sendResponse(res, 429, null, `Please wait until ${waitTime}`);
    }

    // Generate OTP and token
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const token = crypto.randomBytes(32).toString("hex");

    // Set OTP and expiry in user object
    user.otp = {
      otp,
      sendTime: Date.now() + 60 * 800,
      token,
    };

    await user.save();

    const emailResponse = await sendResetOtp(otp, email);

    // Check if email sending succeeded
    if (!emailResponse.success) {
      return sendResponse(
        res,
        500,
        null,
        "Failed to send OTP email. Please try again later."
      );
    }

    return sendResponse(res, 200, token, `OTP sent to ${email}`);
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};

export const verifyOtp = async (req, res, next) => {
  const { sotp } = req.body;

  try {
    const user = await User.findOne({ "otp.otp": sotp });

    if (!user) return sendResponse(res, 404, null, "INVALID OTP");

    if (new Date(user.otp.sendTime).getTime() < new Date().getTime()) {
      return sendResponse(res, 404, null, "OTP Expire");
    }
    user.otp.otp = null;
    await user.save();
    return sendResponse(res, 200, null, "Otp Verified");
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res) => {
  const { password, confirmPassword, token } = req.body;

  try {
    const user = await User.findOne({ "otp.token": token });
    if (!user) {
      return sendResponse(res, 404, null, "Something Went Wrong");
    }

    if (
      new Date(user.otp.sendTime).getTime() + 5 * 60 * 1000 <
      new Date().getTime()
    ) {
      return sendResponse(res, 404, null, "Something Went Wrong");
    }

    if (password !== confirmPassword) {
      return sendResponse(res, 404, null, "Password does Not Match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp.sendTime = null;
    user.otp.token = null;
    await user.save();

    return sendResponse(res, 200, null, "Password Updated Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("profile.company");

    if (!users || users.length === 0) {
      return sendResponse(res, 404, null, "No User Found");
    }

    return sendResponse(res, 200, users, "Users Found");
  } catch (error) {}
  console.error("Error fetching all Users:", error); // Log the error for debugging
  return sendResponse(res, 500, null, "Internal Server Error");
};

export const deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.params.id;
    if (!userId) {
      await session.abortTransaction();
      session.endSession();
      return sendResponse(res, 400, null, "User ID is required");
    }

    // Find the user
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return sendResponse(res, 404, null, "User Not Found");
    }

    if (user.role === "student") {
      // Delete all applications related to the student
      await Application.deleteMany({ applicant: userId }).session(session);
      console.log(`Deleted applications of student: ${userId}`);
    } else if (user.role === "recruiter") {
      // Find all companies associated with the recruiter
      const companies = await Company.find({ userId }).session(session);

      for (const company of companies) {
        // Find and delete all jobs under each company
        const jobs = await Job.find({ company: company._id }).session(session);

        for (const job of jobs) {
          // Delete applications related to each job
          await Application.deleteMany({ job: job._id }).session(session);
          console.log(`Deleted applications for job: ${job._id}`);
        }

        // Delete the jobs
        await Job.deleteMany({ company: company._id }).session(session);
        console.log(`Deleted jobs of company: ${company._id}`);
      }

      // Delete the companies
      await Company.deleteMany({ userId }).session(session);
      console.log(`Deleted companies of recruiter: ${userId}`);
    }

    // Finally, delete the user
    await User.findByIdAndDelete(userId).session(session);
    console.log(`Deleted user: ${userId}`);

    await session.commitTransaction();
    session.endSession();

    return sendResponse(
      res,
      200,
      null,
      "User and related data deleted successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting user:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
