import express from 'express';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

const PORT = process.env.PORT || 4000;

app.use(express.json({limit: "10mb"}));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", userRoute);
app.use("/api/message", messageRoute);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})