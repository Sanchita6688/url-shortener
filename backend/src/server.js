import express from "express"
import router from "./routes/url.js";
import connectToMongodb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5001;

connectToMongodb(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });

app.use(express.json());
app.use("/url",router);

app.listen(PORT,() => {
    console.log("server is running on PORT",PORT);
})