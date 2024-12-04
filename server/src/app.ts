import express from "express";
import { Express } from "express";
import http from "http";
import cors from "cors";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat";
import contactsRouter from "./routes/contacts";
import { initSocket } from "./services/socket";

const app: Express = express();
const httpServer = http.createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

initSocket(httpServer);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);
app.use("/chat", chatRouter);

export { app, httpServer };
