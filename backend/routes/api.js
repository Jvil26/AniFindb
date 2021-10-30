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
  const page = req.query.page;
  try {
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

router.get("/anime-list/search", authToken, async (req, res) => {
  const animeTitle = req.query.title;
  try {
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
  const animeID = req.params.id;
  try {
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
  const page = req.query.page;
  try {
    const mangas = await fetch(
      `https://api.jikan.moe/v3/top/manga/${page}/bypopularity`,
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
  const mangaTitle = req.query.title;
  try {
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
  const mangaID = req.params.id;
  try {
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
  const page = req.query.page;
  try {
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
  const charTitle = req.query.title;
  try {
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
  const id = req.params.id;
  try {
    const character = await fetch(`https://api.jikan.moe/v3/character/${id}/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const parsedCharacter = await character.json();
    res.json(parsedCharacter);
  } catch (err) {
    res.status(400).send({ message: "Failed to get character details" });
  }
});

router.get("/search", authToken, async (req, res) => {
  const { type, genreIds, page } = req.query;
  try {
    const data = await fetch(
      `https://api.jikan.moe/v3/search/${type}?q=&page=${page}&genre=${genreIds}&order_by=score`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    let parsedData = await data.json();
    res.json(parsedData);
  } catch (err) {
    res.status(400).send({ message: "Unable to load data" });
  }
});

module.exports = router;
