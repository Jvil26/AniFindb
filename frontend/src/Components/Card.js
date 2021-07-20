import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Card(props) {
  const { anime, manga, character, dark_mode } = props;
  if (anime) {
    return (
      <div className={"card " + (dark_mode ? "dark2BG text-white" : "")}>
        <img
          src={anime.image_url}
          className="card-img-top rounded"
          alt="Anime"
        />
        <div className="card-body">
          <h5 className="card-title">{anime.title}</h5>
          <p className="card-text">Rank: {anime.rank}</p>
          <p className="card-text">Episodes: {anime.episodes}</p>
          <Link to={"/anime-details/" + anime.mal_id + "/" + anime.title}>
            <button type="button" className="btn btn-primary">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    );
  } else if (manga) {
    return (
      <div className={"card " + (dark_mode ? "dark2BG text-white" : "")}>
        <img
          src={manga.image_url}
          className="card-img-top rounded"
          alt="Manga"
        />
        <div className="card-body">
          <h5 className="card-title">{manga.title}</h5>
          <p className="card-text">Rank: {manga.rank}</p>
          <p className="card-text">
            Volumes: {manga.volumes ? manga.volumes : "N/A"}
          </p>
          <Link to={"/manga-details/" + manga.mal_id + "/" + manga.title}>
            <button type="button" className="btn btn-primary">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"card " + (dark_mode ? "dark2BG text-white" : "")}>
        <img
          src={character.image_url}
          className="card-img-top rounded"
          alt="char"
        />
        <div className="card-body">
          <h5 className="card-title">
            {character.title ? character.title : character.name}
          </h5>
          <p className="card-text">{character.name_kanji}</p>
          {character.rank ? (
            <p className="card-text">Rank: {character.rank}</p>
          ) : (
            <p></p>
          )}
          <Link
            to={
              "/character-details/" + character.mal_id + "/" + character.title
            }
          >
            <button type="button" className="btn btn-primary">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
