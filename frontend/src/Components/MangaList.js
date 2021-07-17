import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Search from "./Search";
import MangaCard from "./MangaCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "../App.css";

export default class MangaList extends Component {
  state = {
    message: "",
    mangas: [],
    filteredMangas: [],
    loading: false,
    page: 1,
    hasMore: true,
    currentFilter: "manga",
  };

  handleSearch = (e, searchState, reset) => {
    e.preventDefault();
    let searchVal = "";
    if (!reset) {
      searchVal = e.target.value;
    }
    this.setState({
      filteredMangas: this.state.mangas.filter((manga) =>
        manga.title.toLowerCase().includes(searchVal)
      ),
      hasMore: true,
    });
    if (searchVal.length > 0) {
      this.setState({
        hasMore: false,
      });
    }
  };

  getMangas = async (filterType) => {
    try {
      this.setState({
        loading: true,
      });
      const page = this.state.page;
      const subtype = "bypopularity";
      const res = await fetch(
        `http://localhost:5000/api/manga-list?subtype=${subtype}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": this.props.userToken,
          },
        }
      );
      const mangas = await res.json();
      if (res.status !== 200) {
        this.setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        this.setState({
          mangas: [...this.state.filteredMangas, ...mangas.top],
          filteredMangas: [...this.state.filteredMangas, ...mangas.top],
          loading: false,
          page: this.state.page + 1,
        });
      }
      console.log(this.state.filteredMangas);
    } catch (err) {
      this.setState({
        message: "Failed to load mangas",
        loading: false,
        hasMore: false,
      });
    }
  };

  componentDidMount = () => {
    this.getMangas();
  };

  render() {
    const { message, filteredMangas, loading, hasMore } = this.state;
    const { darkMode } = this.props;
    if (loading) {
      return (
        <div
          className={
            "container loading-container " + (darkMode ? "bg-dark" : "")
          }
        >
          {loading ? (
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          ) : (
            <div></div>
          )}
        </div>
      );
    } else {
      let columns = [];
      filteredMangas.forEach((manga, idx) => {
        columns.push(
          <div className="col-4 mt-4 mb-4" key={idx}>
            <MangaCard darkMode={darkMode} manga={manga} />
          </div>
        );
        if ((idx + 1) % 3 === 0) {
          columns.push(<div className="w-100" key={idx + 200}></div>);
        }
      });
      return (
        <div
          className={
            "container animeList-container " + (darkMode ? "bg-dark" : "")
          }
        >
          <Search
            resultsLength={filteredMangas.length}
            handleSearch={this.handleSearch}
          />
          {message ? (
            <p className="text-danger mt-5">{message}</p>
          ) : (
            <div></div>
          )}
          <InfiniteScroll
            className="container mt-5"
            dataLength={filteredMangas.length}
            hasMore={hasMore}
          >
            {<div className="row">{columns}</div>}
          </InfiniteScroll>
          {hasMore ? (
            <button
              type="button"
              className="btn btn-secondary mb-4 mt-4"
              onClick={this.getMangas}
            >
              Load More Mangas
            </button>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
  }
}
