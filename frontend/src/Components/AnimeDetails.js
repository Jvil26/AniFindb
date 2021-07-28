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
    genres: "",
    studios: "",
  });

  const getAnimeDetails = async () => {
    setState({
      ...state,
      loading: true,
    });
    const { id } = props.match.params;
    try {
      const res = await fetch(`http://localhost:5000/api/anime-details/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": props.userToken,
        },
      });
      const anime = await res.json();
      console.log(anime);
      if (res.status !== 200) {
        setState({
          loading: false,
          message: anime.message,
        });
      } else if (res.status === 200) {
        let genres = "";
        anime.genres.forEach((genre) => {
          genres += genre.name + ", ";
        });
        genres = genres.slice(0, -1);
        let studios = "";
        anime.studios.forEach((studio) => {
          studios += studio.name + ", ";
        });
        studios = studios.slice(0, -1);
        setState({
          ...state,
          loading: false,
          anime: anime,
          genres: genres.slice(0, -1),
          studios: studios.slice(0, -1),
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
          <Link
            to={props.location.backURL ? props.location.backURL : "/anime-list"}
            exact
          >
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
            <div className="loader">
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            </div>
          ) : (
            <div>
              <div
                className={
                  "card card-details mx-auto mb-5 mt-5 " +
                  (dark_mode ? "dark2BG text-white" : "")
                }
              >
                <div className="card-body">
                  <h5 className="card-title pt-2">{anime.title}</h5>
                  <p className="card-text pb-2 mb-2">
                    {anime.title === anime.title_english
                      ? "Japanese Title: " + anime.title_japanese
                      : "English Title: " + anime.title_english}
                  </p>
                  <p className="card-text">Episodes: {anime.episodes}</p>
                  <p className="card-text">Rating: {anime.rating}</p>
                  <p className="card-text">Genres: {state.genres}</p>
                  <p className="card-text">Duration: {anime.duration}</p>
                  <p className="card-text">Studios: {state.studios}</p>
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
