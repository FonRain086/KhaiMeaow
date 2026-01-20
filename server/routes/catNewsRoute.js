const express = require("express");
const router = express.Router();
const { getCatNews } = require("../api/catNewsAPI");

router.get("/catnews", async (req, res) => {
  try {
    const news = await getCatNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cat news" });
  }
});

module.exports = router;
