import express from "express";
import cors from "cors";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blog-posts")
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.log("Error connecting to MongoDB:", error);
})

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Blog Post app Server" })
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT || 8000}`);
});