import express from "express";
import {
  login,
  logOut,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), register);
userRouter.post("/login", login);
userRouter.get("/logOut", logOut);
userRouter.put("/profile/update", auth, upload.single("file"), updateProfile);

export default userRouter;
