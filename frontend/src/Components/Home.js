import React, { useState } from "react";
import AuthError from "./AuthError";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home(props) {
  const { currentUser } = props;
  return (
    <div>
      {currentUser ? (
        <div className="cover-container">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://wallpaperaccess.com/full/2725441.jpg"
                  alt="First slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>Anime</h1>
                  <p className="lead">
                    AniFind offers a large collection of animes that you can
                    search through and learn about. What will be your next
                    favorite anime?
                  </p>
                  <p className="lead">
                    <Link
                      exact
                      to="/anime-list"
                      className="btn btn-lg btn-secondary fw-bold"
                    >
                      Discover Animes
                    </Link>
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://st2.depositphotos.com/4741067/7734/i/950/depositphotos_77348232-stock-photo-rows-of-colorful-manga-books.jpg"
                  alt="Second slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>Mangas</h1>
                  <p className="lead">
                    AniFind offers a large collection of mangas that you can
                    search through and learn about. What will be your next
                    favorite manga?
                  </p>
                  <p className="lead">
                    <Link
                      exact
                      to="/manga-list"
                      className="btn btn-lg btn-secondary fw-bold"
                    >
                      Discover Mangas
                    </Link>
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://variety.com/wp-content/uploads/2015/07/naruto_movie-lionsgate.jpg"
                  alt="Third slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>Characters</h1>
                  <p className="lead">
                    AniFind offers a large collection of characters that you can
                    search through and learn more about your favorite
                    characters.
                  </p>
                  <p className="lead">
                    <Link
                      exact
                      to="/character-list"
                      className="btn btn-lg btn-secondary fw-bold"
                    >
                      Discover Characters
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      ) : (
        <AuthError />
      )}
    </div>
  );
}
