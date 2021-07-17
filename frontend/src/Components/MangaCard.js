import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default class MangaCard extends Component {
  render() {
    const { manga, darkMode } = this.props;
    return (
      <div className={"card " + (darkMode ? "bg-secondary" : "")}>
        <img
          src={manga.image_url}
          className="card-img-top rounded"
          alt="Manga"
        />
        <div className={"card-body " + (darkMode ? "text-white" : "")}>
          <h5 className="card-title">{manga.title}</h5>
          <p className="card-text">
            Volumes: {manga.volumes ? manga.volumes : "N/A"}
          </p>
          <Link to={"/manga-details/" + manga.mal_id}>
            <button type="button" className="btn btn-primary">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
