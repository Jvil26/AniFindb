import React, { useState } from "react";
import AuthError from "./AuthError";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home(props) {
  const { currentUser, darkMode } = props;
  return (
    <div>
      {currentUser ? (
        <div className={"cover-container " + (darkMode ? "bg-dark" : "")}>
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
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
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src="https://wallpaperaccess.com/full/2725441.jpg"
                  alt="First slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <h1>Anime</h1>
                  <p class="lead">
                    AniFind offers a large collection of animes that you can
                    search through and learn about. What will be your next
                    favorite anime?
                  </p>
                  <p class="lead">
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
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="https://st2.depositphotos.com/4741067/7734/i/950/depositphotos_77348232-stock-photo-rows-of-colorful-manga-books.jpg"
                  alt="Second slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <h1>Mangas</h1>
                  <p class="lead">
                    AniFind offers a large collection of mangas that you can
                    search through and learn about. What will be your next
                    favorite manga?
                  </p>
                  <p class="lead">
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
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="https://variety.com/wp-content/uploads/2015/07/naruto_movie-lionsgate.jpg"
                  alt="Third slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <h1>Characters</h1>
                  <p class="lead">
                    AniFind offers a large collection of characters that you can
                    search through and learn more about your favorite
                    characters.
                  </p>
                  <p class="lead">
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
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      ) : (
        <AuthError />
      )}
    </div>
  );
}
