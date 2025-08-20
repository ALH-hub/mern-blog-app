import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Blog Post app Server" })
})

app.listen(8000, () => {
  console.log("Server is running on: http://localhost:8000");
});