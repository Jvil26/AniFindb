import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import AuthError from "./AuthError";
import "../App.css";

export default function CharDetails(props) {
  const [state, setState] = useState({
    message: "",
    loading: true,
    character: {},
  });

  const getCharDetails = async () => {
    try {
      setState({
        loading: true,
      });
      const { id } = props.match.params;
      const res = await fetch(
        `http://localhost:5000/api/character-details/${id}`,
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
          message: res.message,
        });
      } else if (res.status === 200) {
        setState({
          loading: false,
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
  const { darkMode, userToken } = props;
  return (
    <div>
      {userToken ? (
        <div
          className={
            "container animeDetails-container " + (darkMode ? "darkBG" : "")
          }
        >
          <Link to="/character-list" exact>
            <i
              className={
                "fas fa-arrow-left fa-3x position-absolute " +
                (darkMode ? "text-light" : "text-dark")
              }
            ></i>
          </Link>
          {message ? (
            <p className="text-danger mt-5">{message}</p>
          ) : (
            <div></div>
          )}
          {loading ? (
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          ) : (
            <div>
              <div
                className={
                  "card card-details mx-auto mb-5 mt-5 " +
                  (darkMode ? "dark2BG text-white" : "")
                }
              >
                <div className="card-body">
                  <h4 className="card-title">Name: {character.name}</h4>
                  <h5 className="card-title">
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
