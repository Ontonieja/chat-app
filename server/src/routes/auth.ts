import { Router } from "express";
import {
  getUserInfo,
  signUp,
  updateUserProfile,
  userLogin,
} from "../controllers/auth";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/signup", signUp);
router.post("/login", userLogin);
router.get("/user-info", isAuth, getUserInfo);
router.post("/profile-setup", isAuth, updateUserProfile);

export default router;
