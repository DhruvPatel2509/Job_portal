import express from "express";
import {
  login,
  logOut,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.get("/logOut", logOut);
userRouter.put("/profile/update", auth, updateProfile);

export default userRouter;
