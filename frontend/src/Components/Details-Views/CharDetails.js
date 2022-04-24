import React, { useState, useEffect, useContext } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import AuthError from "../Auth-Views/AuthError";

import UserContext from "../../UserContext";
import SetUserContext from "../../SetUserContext";

import "../../App.css";

export default function CharDetails(props) {
  const [state, setState] = useState({
    message: "",
    loading: true,
    character: {},
    favorite: false,
  });

  const currentUser = useContext(UserContext);
  const setUser = useContext(SetUserContext);

  const addToFavorites = async (e, item, category) => {
    try {
      const res = await fetch(
        "https://anifindb.herokuapp.com/users/favorites/add",
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
    e.preventDefault();
    try {
      const res = await fetch(
        "https://anifindb.herokuapp.com/users/favorites/remove",
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

  const getCharDetails = async () => {
    setState({
      loading: true,
    });
    const { id } = props.match.params;
    try {
      const res = await fetch(
        `https://anifindb.herokuapp.com/api/character-details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const character = await res.json();
      if (res.status !== 200) {
        setState({
          loading: false,
          message: character.message,
        });
      } else if (res.status === 200) {
        setState({
          ...state,
          loading: false,
          favorite: currentUser.favorites.some((item) =>
            item.mal_id === character.mal_id && item.category === "character"
              ? true
              : null
          ),
          character: character,
        });
      }
    } catch (err) {
      setState({
        message: "Failed to get chararacter details",
        loading: false,
      });
    }
  };

  useEffect(() => {
    getCharDetails();
  }, []);

  const { loading, message, character } = state;
  const { dark_mode, userToken } = props;
  return (
    <div>
      {userToken ? (
        <div
          className={
            "container animeDetails-container " + (dark_mode ? "darkBG" : "")
          }
        >
          <Link
            to={
              props.location.backURL
                ? props.location.backURL
                : "/character-list"
            }
            exact
          >
            <i
              className={
                "fas fa-arrow-left fa-3x " +
                (dark_mode ? "text-light" : "text-dark")
              }
            ></i>
          </Link>
          {message ? (
            <p className="text-danger mt-5">{message}</p>
          ) : (
            <div></div>
          )}
          {loading ? (
            <div className="loader">
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            </div>
          ) : (
            <div>
              <div
                className={
                  "card card-details mx-auto mb-5 mt-5 shadow-lg " +
                  (dark_mode ? "dark2BG text-white" : "")
                }
              >
                <div className="card-body">
                  {state.favorite ? (
                    <i
                      className="fas fa-star fa-2x mr-1 mb-1 details-fav-icon"
                      type="button"
                      onClick={(e) => removeFavorite(e, character, "character")}
                    ></i>
                  ) : (
                    <i
                      className="far fa-star fa-2x mr-1 mb-1 details-fav-icon"
                      type="button"
                      onClick={(e) => addToFavorites(e, character, "character")}
                    ></i>
                  )}
                  <h3 className="card-title pt-2">{character.name}</h3>
                  <h5 className="card-title pb-3">
                    Kanji Name: {character.name_kanji}
                  </h5>
                  <h6 className="card-title mt-3">About: </h6>
                  <p className="display-linebreak">{character.about}</p>
                  <img
                    className="mt-4"
                    src={character.image_url}
                    alt="MangaImage"
                  ></img>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <AuthError />
      )}
    </div>
  );
}
