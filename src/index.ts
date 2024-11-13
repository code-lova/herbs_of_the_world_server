import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import apiRoutes from "./routes/api.route";
import adminMiddleware from "./middleware/adminMiddleware";

const app = express();
// Define a whitelist of allowed origins
app.use(
  cors({
    origin: APP_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res, next) => {
    res.status(OK).json({
      status: "Healthy",
    });
});

app.use("/auth", authRoutes);

//protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

//This api route is restrcited for only roles that are admin
app.use("/api", authenticate, adminMiddleware, apiRoutes);

//This api route is for fetching and posting made by authentcated users
//app.use("herbs", authenticate, herbsRoutes)


app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is live on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
