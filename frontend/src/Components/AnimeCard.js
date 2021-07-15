import React, { Component } from "react";
import "../App.css";

export default class AnimeList extends Component {
  render() {
    const { anime, index } = this.props;
    return (
      <div className="card">
        <img
          src={anime.image_url}
          className="card-img-top rounded"
          alt="Anime"
        />
        <div className="card-body">
          <h5 className="card-title">{anime.title}</h5>
          <p className="card-text">Episodes: {anime.episodes}</p>
          <a href={anime.url} target="_blank" className="btn btn-primary">
            Learn More
          </a>
        </div>
      </div>
    );
  }
}
