import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Search from "./Search";
import CharCard from "./CharCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "../App.css";

export default class CharList extends Component {
  state = {
    message: "",
    characters: [],
    filteredChars: [],
    loading: false,
    page: 1,
    hasMore: true,
    currentFilter: "chars",
  };

  handleSearch = (e, searchState, reset) => {
    e.preventDefault();
    let searchVal = "";
    if (!reset) {
      searchVal = e.target.value;
    }
    this.setState({
      filteredChars: this.state.characters.filter((character) =>
        character.title.toLowerCase().includes(searchVal)
      ),
      hasMore: true,
    });
    if (searchVal.length > 0) {
      this.setState({
        hasMore: false,
      });
    }
  };

  getChars = async (filterType) => {
    try {
      this.setState({
        loading: true,
      });
      const page = this.state.page;
      const res = await fetch(
        `http://localhost:5000/api/character-list?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": this.props.userToken,
          },
        }
      );
      const characters = await res.json();
      if (res.status !== 200) {
        this.setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        this.setState({
          characters: [...this.state.filteredChars, ...characters.top],
          filteredChars: [...this.state.filteredChars, ...characters.top],
          loading: false,
          page: this.state.page + 1,
        });
      }
      console.log(this.state.filteredChars);
    } catch (err) {
      this.setState({
        message: "Failed to load characters",
        loading: false,
        hasMore: false,
      });
    }
  };

  componentDidMount = () => {
    this.getChars();
  };

  render() {
    const { message, filteredChars, loading, hasMore } = this.state;
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
      filteredChars.forEach((character, idx) => {
        columns.push(
          <div className="col-4 mt-4 mb-4" key={idx}>
            <CharCard darkMode={darkMode} character={character} />
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
            resultsLength={filteredChars.length}
            handleSearch={this.handleSearch}
          />
          {message ? (
            <p className="text-danger mt-5">{message}</p>
          ) : (
            <div></div>
          )}
          <InfiniteScroll
            className="container mt-5"
            dataLength={filteredChars.length}
            hasMore={hasMore}
          >
            {<div className="row">{columns}</div>}
          </InfiniteScroll>
          {hasMore ? (
            <button
              type="button"
              className="btn btn-secondary mb-4 mt-4"
              onClick={this.getChars}
            >
              Load More Characters
            </button>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
  }
}
