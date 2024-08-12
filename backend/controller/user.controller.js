import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import sendResponse from "../utils/response.util.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return sendResponse(res, 400, null, "Something is Missing");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendResponse(res, 400, null, "User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return sendResponse(res, 201, null, "User Registered Successfully");
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
      return sendResponse(res, 400, null, "User does not exist");
    }

    // Check if the provided role matches the user's role
    if (role !== user.role) {
      return sendResponse(res, 400, null, "Incorrect role");
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return sendResponse(res, 400, null, "Incorrect password");
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
    };

    // Send response with token as a cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Prevent client-side access to the cookie
        sameSite: "strict", // Prevent CSRF attacks
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        success: true,
        user: userResponse, // Renamed from userResponse to user for consistency
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
    const userId = req.userId; // Assuming req.userId is where the user ID is stored

    // Construct an object with only the fields that are provided
    const updateFields = {};

    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (bio || skills) {
      updateFields.profile = updateFields.profile || {};
      if (bio) updateFields.profile.bio = bio;
      if (skills) {
        updateFields.profile.skills = skills.split(",");
      }
    }

    // Update user document
    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true } // Option to return the updated document and run validators
    );

    if (!user) {
      return sendResponse(res, 404, null, "User Not Found");
    }

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
