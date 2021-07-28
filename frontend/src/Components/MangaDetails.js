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
    genres: "",
    authors: "",
    published: "",
  });

  const getMangaDetails = async () => {
    setState({
      ...state,
      loading: true,
    });
    const { id } = props.match.params;
    try {
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
          message: manga.message,
        });
      } else if (res.status === 200) {
        let genres = "";
        manga.genres.forEach((genre) => {
          genres += genre.name + ", ";
        });
        let authors = "";
        manga.authors.forEach((author) => {
          authors += author.name + ", ";
        });
        genres = genres.slice(0, -1);
        authors = authors.slice(0, -1);
        console.log(manga);
        setState({
          ...state,
          loading: false,
          manga: manga,
          genres: genres.slice(0, -1),
          authors: authors.slice(0, -1),
          published: manga.published.string,
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
            to={props.location.backURL ? props.location.backURL : "/manga-list"}
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
                  <h5 className="card-title pt-2">{manga.title}</h5>
                  <p className="card-text pb-2">
                    {manga.title === manga.title_english
                      ? "Japanese Title: " + manga.title_japanese
                      : "English Title: " + manga.title_english}
                  </p>
                  <p className="card-text">Authors: {state.authors}</p>
                  <h6 className="card-title pt-3">Volumes: {manga.volumes}</h6>
                  <h6 className="card-title pb-4">
                    Chapters: {manga.chapters}
                  </h6>
                  <h6 className="card-title pt-3">
                    Published From: {state.published}
                  </h6>
                  <p className="card-text">Genres: {state.genres}</p>
                  <p className="card-text mb-3">{manga.synopsis}</p>
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
