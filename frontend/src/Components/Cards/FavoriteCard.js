import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import UserContext from "../../UserContext";
import SetUserContext from "../../SetUserContext";

import AuthError from "../Auth-Views/AuthError";

export default function FavoriteCard(props) {
  const { favoriteItem, dark_mode } = props;

  const currentUser = useContext(UserContext);
  const setUser = useContext(SetUserContext);

  const [hover, setHover] = useState(false);

  const handleCardHover = () => {
    setHover(!hover);
  };

  const removeFavorite = async (e, item, category) => {
    try {
      const res = await fetch(
        "process.env.REACT_APP_SERVER_URL/users/favorites/remove",
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
      }
    } catch (err) {
      throw err;
    }
  };

  if (currentUser) {
    if (favoriteItem.category === "anime") {
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
            src={favoriteItem.image_url}
            className="card-img-top rounded"
            alt="Anime"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">{favoriteItem.title}</h5>
            <p className="card-text">Episodes: {favoriteItem.length}</p>
            <Link
              to={{
                pathname:
                  "/anime-details/" +
                  favoriteItem.mal_id +
                  "/" +
                  favoriteItem.title,
                backURL: "/favorites",
              }}
            >
              <button type="button" className="btn btn-primary mt-3">
                Learn More
              </button>
            </Link>
            <div className="row row d-flex justify-content-center">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm mt-5"
                  onClick={(e) => removeFavorite(e, favoriteItem, "anime")}
                >
                  Remove From Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (favoriteItem.category === "manga") {
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
            src={favoriteItem.image_url}
            className="card-img-top rounded"
            alt="Manga"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">{favoriteItem.title}</h5>
            <p className="card-text">
              Volumes: {favoriteItem.length ? favoriteItem.length : "N/A"}
            </p>
            <Link
              to={{
                pathname:
                  "/manga-details/" +
                  favoriteItem.mal_id +
                  "/" +
                  favoriteItem.title,
                backURL: "/favorites",
              }}
            >
              <div className="row row d-flex justify-content-center">
                <div className="col-6">
                  <button type="button" className="btn btn-primary btn-sm mt-3">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
            <div className="row row d-flex justify-content-center">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm mt-5"
                  onClick={(e) => removeFavorite(e, favoriteItem, "manga")}
                >
                  Remove From Favorites
                </button>
              </div>
            </div>
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
            src={favoriteItem.image_url}
            className="card-img-top rounded"
            alt="char"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">
              {favoriteItem.title ? favoriteItem.title : favoriteItem.name}
            </h5>
            <p className="card-text">{favoriteItem.name_kanji}</p>
            <Link
              to={{
                pathname:
                  "/character-details/" +
                  favoriteItem.mal_id +
                  "/" +
                  favoriteItem.title,
                backURL: "/favorites",
              }}
            >
              <div className="row row d-flex justify-content-center">
                <div className="col-6">
                  <button type="button" className="btn btn-primary mt-3">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
            <div className="row row d-flex justify-content-center">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm mt-5"
                  onClick={(e) => removeFavorite(e, favoriteItem, "character")}
                >
                  Remove From Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <AuthError />;
  }
}
