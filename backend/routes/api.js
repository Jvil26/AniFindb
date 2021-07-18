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

router.get("/anime-list", authToken, async (req, res) => {
  try {
    const page = req.query.page;
    const subtype = req.query.subtype;
    const subType = "bypopularity";
    const animes = await fetch(
      `https://api.jikan.moe/v3/top/anime/${page}/${subtype}`,
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

router.get("/anime-list/search", authToken, async (req, res) => {
  try {
    const animeTitle = req.query.title;
    const anime = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${animeTitle}&page=1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const parsedAnime = await anime.json();
    res.json(parsedAnime);
  } catch (err) {
    res.status(400).send({ message: "Failed to get anime" });
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

router.get("/manga-list", authToken, async (req, res) => {
  try {
    const page = req.query.page;
    const subtype = req.query.subtype;
    const mangas = await fetch(
      `https://api.jikan.moe/v3/top/manga/${page}/${subtype}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const parsedMangas = await mangas.json();
    res.json(parsedMangas);
  } catch (err) {
    res.status(400).send({ message: "Failed to get manga list" });
  }
});

router.get("/manga-list/search", authToken, async (req, res) => {
  try {
    const mangaTitle = req.query.title;
    const manga = await fetch(
      `https://api.jikan.moe/v3/search/manga?q=${mangaTitle}&page=1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const parsedManga = await manga.json();
    res.json(parsedManga);
  } catch (err) {
    res.status(400).send({ message: "Failed to get anime" });
  }
});

router.get("/manga-details/:id", authToken, async (req, res) => {
  try {
    const mangaID = req.params.id;
    const manga = await fetch(`https://api.jikan.moe/v3/manga/${mangaID}//`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const parsedManga = await manga.json();
    res.json(parsedManga);
  } catch (err) {
    res.status(400).send({ message: "Failed to get manga details" });
  }
});

router.get("/character-list", authToken, async (req, res) => {
  try {
    const page = req.query.page;
    const characters = await fetch(
      `https://api.jikan.moe/v3/top/characters/${page}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const parsedCharacters = await characters.json();
    res.json(parsedCharacters);
  } catch (err) {
    res.status(400).send({ message: "Failed to get character list" });
  }
});

router.get("/character-list/search", authToken, async (req, res) => {
  try {
    const charTitle = req.query.title;
    const char = await fetch(
      `https://api.jikan.moe/v3/search/character?q=${charTitle}&page=1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const parsedCharacter = await char.json();
    res.json(parsedCharacter);
  } catch (err) {
    res.status(400).send({ message: "Failed to get anime" });
  }
});

router.get("/character-details/:id", authToken, async (req, res) => {
  try {
    const charID = req.params.id;
    const character = await fetch(
      `https://api.jikan.moe/v3/character/${charID}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const parsedCharacter = await character.json();
    res.json(parsedCharacter);
  } catch (err) {
    res.status(400).send({ message: "Failed to get character details" });
  }
});

module.exports = router;
