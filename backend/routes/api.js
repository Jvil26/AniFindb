const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

function authToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get("/anime-list/:page", authToken, async (req, res) => {
  try {
    const page = req.params.page;
    const animes = await fetch(
      `https://api.jikan.moe/v3/top/anime/${page}/bypopularity`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const parsedAnimes = await animes.json();
    res.json(parsedAnimes);
  } catch (err) {
    res.status(400).send({ message: "Failed to get anime list" });
  }
});

router.get("/anime-details/:id", authToken, async (req, res) => {
  try {
    const animeID = req.params.id;
    const anime = await fetch(`https://api.jikan.moe/v3/anime/${animeID}//`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const parsedAnime = await anime.json();
    res.json(parsedAnime);
  } catch (err) {
    res.status(400).send({ message: "Failed to get anime details" });
  }
});

module.exports = router;
