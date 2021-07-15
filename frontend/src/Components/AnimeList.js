import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Search from "./Search";
import AnimeCard from "./AnimeCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "../App.css";

export default class AnimeList extends Component {
  state = {
    message: "",
    animes: [],
    filteredAnimes: [],
    loading: false,
    page: 1,
    hasMore: true,
  };

  handleSearch = (e) => {
    const searchVal = e.target.value;
    this.setState({
      filteredAnimes: this.state.animes.filter((anime) =>
        anime.title.toLowerCase().includes(searchVal)
      ),
      hasMore: true,
    });
    if (searchVal.length > 0) {
      this.setState({
        hasMore: false,
      });
    }
    console.log(this.state.hasMore);
  };

  getAnimes = async () => {
    try {
      this.setState({
        loading: true,
      });
      const page = this.state.page;
      const res = await fetch(`http://localhost:5000/api/anime-list/${page}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": this.props.userToken,
        },
      });
      const animes = await res.json();
      if (res.status !== 200) {
        this.setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        this.setState({
          animes: animes.top,
          filteredAnimes: [...this.state.filteredAnimes, ...animes.top],
          loading: false,
          page: this.state.page + 1,
        });
      }
      console.log(this.state.filteredAnimes);
    } catch (err) {
      this.setState({
        message: "Failed to load animes",
        loading: false,
      });
    }
  };

  componentDidMount = () => {
    this.getAnimes();
  };

  render() {
    const { message, filteredAnimes, loading, hasMore } = this.state;
    if (loading) {
      return (
        <div className="container">
          {loading ? (
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          ) : (
            <div></div>
          )}
        </div>
      );
    } else {
      let columns = [];
      filteredAnimes.forEach((anime, idx) => {
        columns.push(
          <div className="col-4 mt-4 mb-4" key={idx}>
            <AnimeCard anime={anime} />
          </div>
        );
        if ((idx + 1) % 3 === 0) {
          columns.push(<div className="w-100"></div>);
        }
      });
      return (
        <div className="container">
          <Search
            resultsLength={filteredAnimes.length}
            handleSearch={this.handleSearch}
          />
          {message ? (
            <p className="text-danger mt-5">{message}</p>
          ) : (
            <div></div>
          )}
          <InfiniteScroll
            className="container mt-5"
            dataLength={filteredAnimes.length}
            hasMore={hasMore}
          >
            {<div className="row">{columns}</div>}
          </InfiniteScroll>
          {hasMore ? (
            <button
              type="button"
              class="btn btn-secondary mb-4 mt-4"
              onClick={this.getAnimes}
            >
              Load More Animes
            </button>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
  }
}
