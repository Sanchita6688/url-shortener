import express from "express"
import urlRoute from "./routes/url.js";
import redirectRoute from "./routes/redirect.js";
import analyticsRoute from "./routes/analytics.js";
import connectToMongodb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/url", urlRoute);
app.use("/analytics", analyticsRoute);
app.use("/", redirectRoute);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

connectToMongodb(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        app.listen(PORT, () => {
            console.log("server is running on PORT", PORT);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });