import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.util.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return sendResponse(res, 401, "", `User not Authenticated`);
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return sendResponse(res, 401, "", "Invalid Token");
    }

    req.userId = decode.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};
