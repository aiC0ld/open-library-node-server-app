const express = require("express");
const router = express.Router();
const axios = require("axios");

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_API_KEY = "AIzaSyAYctaYwUays7_yyuEv85PD4sGnQ94-KLo";

// Search external books
router.get("/search", async (req, res) => {
  try {
    // Extract query parameter for search
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .send({ success: false, message: "Query parameter is required" });
    }

    // Construct the URL for Google Books API
    const url = `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(
      query
    )}&key=${GOOGLE_API_KEY}`;

    // Make a request to the Google Books API
    const response = await axios.get(url);

    // Send the response back to the client
    return res.send({ success: true, data: response.data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
