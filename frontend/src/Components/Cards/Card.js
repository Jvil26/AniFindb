import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../App.css";

import UserContext from "../../UserContext";
import SetUserContext from "../../SetUserContext";

import AuthError from "../Auth-Views/AuthError";

export default function Card(props) {
  const { anime, manga, character, dark_mode } = props;

  const currentUser = useContext(UserContext);
  const setUser = useContext(SetUserContext);

  const [state, setState] = useState({
    username: "",
    password: "",
    success: false,
    favorite: false,
  });

  const [hover, setHover] = useState(false);

  const handleCardHover = () => {
    setHover(!hover);
  };

  const addToFavorites = async (e, item, category) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/favorites/add`,
        {
          method: "POST",
          body: JSON.stringify({
            userID: currentUser._id,
            item: item,
            category: category,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const user = await res.json();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setState({
          ...state,
          success: true,
          favorite: true,
        });
      }
    } catch (err) {
      setState({
        success: false,
      });
    }
  };

  const removeFavorite = async (e, item, category) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/favorites/remove`,
        {
          method: "DELETE",
          body: JSON.stringify({
            userID: currentUser._id,
            mal_id: item.mal_id,
            category: category,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const user = await res.json();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setState({
          ...state,
          success: true,
          favorite: false,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (anime) {
      setState({
        favorite: currentUser.favorites.some((item) =>
          item.mal_id === anime.mal_id ? true : null
        ),
      });
    } else if (manga) {
      setState({
        favorite: currentUser.favorites.some((item) =>
          item.mal_id === manga.mal_id ? true : null
        ),
      });
    } else {
      setState({
        favorite: currentUser.favorites.some((item) =>
          item.mal_id === character.mal_id ? true : null
        ),
      });
    }
  }, []);

  if (currentUser) {
    if (anime) {
      return (
        <div
          className={
            "card " +
            (dark_mode ? "dark2BG text-white " : " ") +
            (hover ? "shadow-lg" : "shadow")
          }
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardHover}
        >
          <img
            src={anime.images.jpg.image_url}
            className="card-img-top rounded"
            alt="Anime"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">{anime.title}</h5>
            {anime.rank ? (
              <p className="card-text pt-2">Rank: {anime.rank}</p>
            ) : (
              <p></p>
            )}{" "}
            <p className="card-text">
              Start:{" "}
              {anime.aired.from ? anime.aired.from.substring(0, 10) : "N/A"}
            </p>
            <p className="card-text">
              End: {anime.aired.to ? anime.aired.to.substring(0, 10) : "N/A"}
            </p>
            <p className="card-text">Episodes: {anime.episodes}</p>
            <Link
              to={{
                pathname: "/anime-details/" + anime.mal_id + "/" + anime.title,
                backURL: "/anime-list",
              }}
            >
              <button type="button" className="btn btn-primary mt-3">
                Learn More
              </button>
            </Link>
            {state.favorite ? (
              <i
                className="fas fa-star fa-2x mr-1 mb-1"
                type="button"
                onClick={(e) => removeFavorite(e, anime, "anime")}
              ></i>
            ) : (
              <i
                className="far fa-star fa-2x mr-1 mb-1"
                type="button"
                onClick={(e) => addToFavorites(e, anime, "anime")}
              ></i>
            )}
          </div>
        </div>
      );
    } else if (manga) {
      return (
        <div
          className={
            "card " +
            (dark_mode ? "dark2BG text-white " : " ") +
            (hover ? "shadow-lg" : "shadow")
          }
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardHover}
        >
          <img
            src={manga.images.jpg.image_url}
            className="card-img-top rounded"
            alt="Manga"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">{manga.title}</h5>
            {manga.rank ? (
              <p className="card-text pt-2">Rank: {manga.rank}</p>
            ) : (
              <p></p>
            )}{" "}
            <p className="card-text">
              Start: {manga.published.from.substring(0, 10)}
            </p>
            <p className="card-text">
              End:{" "}
              {manga.published.to ? manga.published.to.substring(0, 10) : "N/A"}
            </p>
            <p className="card-text">
              Volumes: {manga.volumes ? manga.volumes : "N/A"}
            </p>
            <Link
              to={{
                pathname: "/manga-details/" + manga.mal_id + "/" + manga.title,
                backURL: "/manga-list",
              }}
            >
              <button type="button" className="btn btn-primary mt-3">
                Learn More
              </button>
            </Link>
            {state.favorite ? (
              <i
                className="fas fa-star fa-2x mr-1 mb-1"
                type="button"
                onClick={(e) => removeFavorite(e, manga, "manga")}
              ></i>
            ) : (
              <i
                className="far fa-star fa-2x mr-1 mb-1"
                type="button"
                onClick={(e) => addToFavorites(e, manga, "manga")}
              ></i>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            "card " +
            (dark_mode ? "dark2BG text-white " : " ") +
            (hover ? "shadow-lg" : "shadow")
          }
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardHover}
        >
          <img
            src={character.images.jpg.image_url}
            className="card-img-top rounded"
            alt="char"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">{character.name}</h5>
            <p className="card-text">{character.name_kanji}</p>
            <Link
              to={{
                pathname:
                  "/character-details/" +
                  character.mal_id +
                  "/" +
                  character.name,
                backURL: "/character-list",
              }}
            >
              <button type="button" className="btn btn-primary mt-3">
                Learn More
              </button>
            </Link>
            {state.favorite ? (
              <i
                className="fas fa-star fa-2x mr-1 mb-1"
                type="button"
                onClick={(e) => removeFavorite(e, character, "character")}
              ></i>
            ) : (
              <i
                className="far fa-star fa-2x mr-1 mb-1"
                type="button"
                onClick={(e) => addToFavorites(e, character, "character")}
              ></i>
            )}
          </div>
        </div>
      );
    }
  } else {
    return <AuthError />;
  }
}
