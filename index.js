import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import helpsRoute from "./routes/helps.js";
import postsRoute from "./routes/posts.js";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB!");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use(cookieParser());
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("views"));

app.get("/", async (req, res) => {
    console.log(req.cookies);
    res.render("index", {
        username: await req.body.username,
        email: await req.body.email,
    });
});

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/helps", helpsRoute);
app.use("/posts", postsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something wen wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend!");
});
