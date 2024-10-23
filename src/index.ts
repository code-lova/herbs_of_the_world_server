import "dotenv/config"
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";

const app = express();
// Define a whitelist of allowed origins
app.use(cors({
    origin: APP_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const port = 4004;


app.get("/health", (req, res) => {
    res.status(200).json({
        status: "Healthy"
    })
});

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server is live on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});