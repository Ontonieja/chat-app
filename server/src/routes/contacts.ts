import { Router } from "express";
import { addContact, findContacts, getContacts } from "../controllers/contacts";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/find-contact", isAuth, findContacts);
router.post("/add-contact", isAuth, addContact);
router.get("/get-contacts", isAuth, getContacts);

export default router;
