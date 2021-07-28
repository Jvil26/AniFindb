import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import UserContext from "../UserContext";

import AuthError from "./AuthError";

export default function Card(props) {
  const { anime, manga, character, dark_mode, setUser } = props;

  const currentUser = useContext(UserContext);

  const [state, setState] = useState({
    username: "",
    password: "",
    success: false,
    favorite: false,
  });

  const addToFavorites = async (e, item, category) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/users/favorites/add", {
        method: "POST",
        body: JSON.stringify({
          userID: currentUser._id,
          item: item,
          category: category,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const user = await res.json();
      if (res.status === 200) {
        setState({
          success: true,
          favorite: true,
        });
      }
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      console.log(user);
    } catch (err) {
      setState({
        success: false,
      });
      console.log(err);
    }
  };

  const removeFavorite = async (e, item, category) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/users/favorites/remove", {
        method: "DELETE",
        body: JSON.stringify({
          userID: currentUser._id,
          item: item,
          category: category,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const user = await res.json();
      if (res.status === 200) {
        setState({
          success: true,
          favorite: false,
        });
      }
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      console.log(user);
    } catch (err) {
      setState({
        success: false,
      });
      console.log(err);
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
        <div className={"card " + (dark_mode ? "dark2BG text-white" : "")}>
          <img
            src={anime.image_url}
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
            <p className="card-text">Start: {anime.start_date}</p>
            <p className="card-text">
              End: {anime.end_date ? anime.end_date : "N/A"}
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
                className="fas fa-star fa-1x mr-1 mb-1"
                type="button"
                onClick={(e) => removeFavorite(e, anime, "anime")}
              ></i>
            ) : (
              <i
                className="far fa-star fa-1x mr-1 mb-1"
                type="button"
                onClick={(e) => addToFavorites(e, anime, "anime")}
              ></i>
            )}
          </div>
        </div>
      );
    } else if (manga) {
      return (
        <div className={"card " + (dark_mode ? "dark2BG text-white" : "")}>
          <img
            src={manga.image_url}
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
            <p className="card-text">Start: {manga.start_date}</p>
            <p className="card-text">
              End: {manga.end_date ? manga.end_date : "N/A"}
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
                className="fas fa-star fa-1x mr-1 mb-1"
                type="button"
                onClick={(e) => removeFavorite(e, manga, "manga")}
              ></i>
            ) : (
              <i
                className="far fa-star fa-1x mr-1 mb-1"
                type="button"
                onClick={(e) => addToFavorites(e, manga, "manga")}
              ></i>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className={"card " + (dark_mode ? "dark2BG text-white" : "")}>
          <img
            src={character.image_url}
            className="card-img-top rounded"
            alt="char"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">
              {character.title ? character.title : character.name}
            </h5>
            <p className="card-text">{character.name_kanji}</p>
            {character.rank ? (
              <p className="card-text">Rank: {character.rank}</p>
            ) : (
              <p></p>
            )}
            <Link
              to={{
                pathname:
                  "/character-details/" +
                  character.mal_id +
                  "/" +
                  character.title,
                backURL: "/character-list",
              }}
            >
              <button type="button" className="btn btn-primary mt-3">
                Learn More
              </button>
            </Link>
            {state.favorite ? (
              <i
                className="fas fa-star fa-1x mr-1 mb-1"
                type="button"
                onClick={(e) => removeFavorite(e, character, "character")}
              ></i>
            ) : (
              <i
                className="far fa-star fa-1x mr-1 mb-1"
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
