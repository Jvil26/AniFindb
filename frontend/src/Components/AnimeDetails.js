import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import "../App.css";

export default class AnimeList extends Component {
  state = {
    message: "",
    loading: false,
    anime: {},
  };

  getAnimeDetails = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { id } = this.props.match.params;
      const res = await fetch(`http://localhost:5000/api/anime-details/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": this.props.userToken,
        },
      });
      const anime = await res.json();
      if (res.status !== 200) {
        this.setState({
          loading: false,
          message: res.message,
        });
      } else if (res.status === 200) {
        this.setState({
          loading: false,
          anime: anime,
        });
      }
    } catch (err) {
      this.setState({
        message: "Failed to get anime details",
        loading: false,
      });
    }
  };

  componentDidMount = () => {
    this.getAnimeDetails();
  };

  render() {
    const { loading, message, anime } = this.state;
    const { darkMode } = this.props;
    return (
      <div
        className={
          "container animeDetails-container " + (darkMode ? "bg-dark" : "")
        }
      >
        <Link to="/" exact>
          <i class="fas fa-arrow-left fa-3x position-absolute text-dark"></i>
        </Link>
        {message ? <p className="text-danger mt-5">{message}</p> : <div></div>}
        {loading ? (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          <div>
            <div className="card mb-5 mt-5">
              <div className="card-body">
                <h5 className="card-title">Title: {anime.title}</h5>
                <h5 className="card-title">
                  English Title: {anime.title_english}
                </h5>
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
    );
  }
}
