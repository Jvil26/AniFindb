import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import "../App.css";

export default class MangaDetails extends Component {
  state = {
    message: "",
    loading: false,
    manga: {},
  };

  getMangaDetails = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { id } = this.props.match.params;
      const res = await fetch(`http://localhost:5000/api/manga-details/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": this.props.userToken,
        },
      });
      const manga = await res.json();
      if (res.status !== 200) {
        this.setState({
          loading: false,
          message: res.message,
        });
      } else if (res.status === 200) {
        this.setState({
          loading: false,
          manga: manga,
        });
      }
    } catch (err) {
      this.setState({
        message: "Failed to get manga details",
        loading: false,
      });
    }
  };

  componentDidMount = () => {
    this.getMangaDetails();
  };

  render() {
    const { loading, message, manga } = this.state;
    const { darkMode } = this.props;
    return (
      <div
        className={
          "container animeList-container " + (darkMode ? "bg-dark" : "")
        }
      >
        <Link to="/manga-list" exact>
          <i className="fas fa-arrow-left fa-3x position-absolute text-dark"></i>
        </Link>
        {message ? <p className="text-danger mt-5">{message}</p> : <div></div>}
        {loading ? (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          <div>
            <div className="card card-details mx-auto mb-5 mt-5">
              <div className="card-body">
                <h5 className="card-title">Title: {manga.title}</h5>
                <h5 className="card-title">
                  English Title: {manga.title_english}
                </h5>
                <h6 className="card-title pt-3">Volumes: {manga.volumes}</h6>
                <h6 className="card-title pb-3">Chapters: {manga.chapters}</h6>
                <p className="card-text">{manga.synopsis}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
