import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";

config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(4000, () => {
      console.log("Server is listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rami-saas-chatbot.vercel.app/api",
    ],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);

export default app;
