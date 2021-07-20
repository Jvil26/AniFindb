import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import AuthError from "./AuthError";
import "../App.css";

export default function AnimeDetails(props) {
  const [state, setState] = useState({
    message: "",
    loading: false,
    anime: {},
  });

  const getAnimeDetails = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const { id } = props.match.params;
      const res = await fetch(`http://localhost:5000/api/anime-details/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": props.userToken,
        },
      });
      const anime = await res.json();
      if (res.status !== 200) {
        setState({
          loading: false,
          message: anime.message,
        });
      } else if (res.status === 200) {
        setState({
          ...state,
          loading: false,
          anime: anime,
        });
      }
    } catch (err) {
      setState({
        message: "Failed to get anime details",
        loading: false,
      });
    }
  };

  useEffect(() => {
    getAnimeDetails();
  }, []);

  const { loading, message, anime } = state;
  const { dark_mode, userToken } = props;
  return (
    <div>
      {userToken ? (
        <div
          className={
            "container animeDetails-container " + (dark_mode ? "darkBG" : "")
          }
        >
          <Link to="/anime-list" exact>
            <i
              className={
                "fas fa-arrow-left fa-3x position-absolute " +
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
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          ) : (
            <div>
              <div
                className={
                  "card card-details mx-auto mb-5 mt-5 " +
                  (dark_mode ? "dark2BG text-white" : "")
                }
              >
                <div className="card-body">
                  <h5 className="card-title">Title: {anime.title}</h5>
                  <h5 className="card-title">
                    English Title: {anime.title_english}
                  </h5>
                  <p className="card-text">{anime.synopsis}</p>
                </div>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    title="animeTrailer"
                    className="embed-responsive-item"
                    src={anime.trailer_url}
                    allowFullScreen
                  ></iframe>
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
