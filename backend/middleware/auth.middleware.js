import jwt from "jsonwebtoken";
import sendResponse from "../utils/response.util.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Example for Bearer token
console.log(token);

    if (!token) {
      return sendResponse(res, 401, "", "User not Authenticated");
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return sendResponse(res, 401, "", "Invalid Token");
    }

    // Attach user ID to the request
    req.userId = decode.userId;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return sendResponse(res, 500, "", "Internal Server Error"); // Send a generic error response
  }
};
