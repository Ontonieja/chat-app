import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import { getMessages, setMessagesRead, uploadFile } from "../controllers/chat";

import multer, { memoryStorage } from "multer";
const router = Router();

const storage = memoryStorage();
const upload = multer({ storage });

router.get("/get-messages", isAuth, getMessages);
router.post("/upload-file", isAuth, upload.single("file"), uploadFile);
router.put("/set-read", isAuth, setMessagesRead);

export default router;
