import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import AuthError from "./AuthError";
import "../App.css";

export default function MangaDetails(props) {
  const [state, setState] = useState({
    message: "",
    loading: false,
    manga: {},
  });

  const getMangaDetails = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const { id } = props.match.params;
      const res = await fetch(`http://localhost:5000/api/manga-details/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": props.userToken,
        },
      });
      const manga = await res.json();
      if (res.status !== 200) {
        setState({
          loading: false,
          message: res.message,
        });
      } else if (res.status === 200) {
        setState({
          ...state,
          loading: false,
          manga: manga,
        });
      }
    } catch (err) {
      setState({
        message: "Failed to get manga details",
        loading: false,
      });
    }
  };

  useEffect(() => {
    getMangaDetails();
  }, []);

  const { loading, message, manga } = state;
  const { darkMode, userToken } = props;
  return (
    <div>
      {userToken ? (
        <div
          className={
            "container animeList-container " + (darkMode ? "darkBG" : "")
          }
        >
          <Link to="/manga-list" exact>
            <i className="fas fa-arrow-left fa-3x position-absolute text-dark"></i>
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
                  <h5 className="card-title">Title: {manga.title}</h5>
                  <h5 className="card-title">
                    English Title: {manga.title_english}
                  </h5>
                  <h6 className="card-title pt-3">Volumes: {manga.volumes}</h6>
                  <h6 className="card-title pb-3">
                    Chapters: {manga.chapters}
                  </h6>
                  <p className="card-text">{manga.synopsis}</p>
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
