import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import { getMessages } from "../controllers/chat";

const router = Router();

router.get("/get-messages", isAuth, getMessages);

export default router;
