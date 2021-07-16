import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default class AnimeList extends Component {
  render() {
    const { anime, index, darkMode } = this.props;
    return (
      <div className={"card " + (darkMode ? "bg-secondary" : "")}>
        <img
          src={anime.image_url}
          className="card-img-top rounded"
          alt="Anime"
        />
        <div className={"card-body " + (darkMode ? "text-white" : "")}>
          <h5 className="card-title">{anime.title}</h5>
          <p className="card-text">Episodes: {anime.episodes}</p>
          <Link to={"/anime-details/" + anime.mal_id}>
            <button type="button" class="btn btn-primary">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
