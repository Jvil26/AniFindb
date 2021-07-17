import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default class CharCard extends Component {
  render() {
    const { character, darkMode } = this.props;
    return (
      <div className={"card " + (darkMode ? "bg-secondary" : "")}>
        <img
          src={character.image_url}
          className="card-img-top rounded"
          alt="char"
        />
        <div className={"card-body " + (darkMode ? "text-white" : "")}>
          <h5 className="card-title">{character.title}</h5>
          <p className="card-text">{character.name_kanji}</p>
          <Link to={"/character-details/" + character.mal_id}>
            <button type="button" className="btn btn-primary">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
