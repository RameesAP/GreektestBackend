import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
dotenv.config();

app.post("/api/movieList", async (req, res) => {
  try {
    const response = await fetch("https://hoblist.com/api/movieList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 8000}`);
});

app.get("/get/search", async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const response = await fetch("https://hoblist.com/api/movieList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "movies",
        language: "kannada",
        genre: "all",
        sort: "voting",
        search: searchTerm,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data searched" });
  }
});