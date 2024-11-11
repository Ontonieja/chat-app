import express from "express";
import { Express } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import { anyBoolean } from "jest-mock-extended";
import contactsRouter from "./routes/contacts";

const app: Express = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);

export { app, httpServer, io };
