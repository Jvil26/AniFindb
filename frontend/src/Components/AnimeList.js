import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Search from "./Search";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthError from "./AuthError";
import "../App.css";

export default function AnimeList(props) {
  const [state, setState] = useState({
    message: "",
    animes: [],
    filteredAnimes: [],
    loading: true,
    page: 1,
    hasMore: true,
    currentFilter: "anime",
  });

  const handleSearch = async (e, inputVal, searchState) => {
    try {
      e.preventDefault();
      setState({
        ...state,
        hasMore: false,
        loading: true,
      });
      const searchVal = inputVal;
      const res = await fetch(
        `http://localhost:5000/api/anime-list/search?title=${searchVal}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const data = await res.json();
      if (res.status !== 200) {
        setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        setState({
          ...state,
          filteredAnimes: [...data.results],
          loading: false,
        });
      }
    } catch (err) {
      setState({
        message: "Cannot find anime",
        loading: false,
        hasMore: false,
      });
    }
  };

  const getAnimes = async (filterType) => {
    try {
      setState({
        ...state,
        loading: true,
      });
      let type = "";
      if (filterType) {
        type = filterType;
      } else {
        type = "anime";
      }
      const page = state.page;
      const subtype = "bypopularity";
      const res = await fetch(
        `http://localhost:5000/api/anime-list?subtype=${subtype}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const animes = await res.json();
      if (res.status !== 200) {
        setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        setState({
          ...state,
          animes: [...state.filteredAnimes, ...animes.top],
          filteredAnimes: [...state.filteredAnimes, ...animes.top],
          loading: false,
          page: state.page + 1,
        });
      }
    } catch (err) {
      setState({
        message: "Failed to load animes",
        loading: false,
        hasMore: false,
      });
    }
  };

  useEffect(() => {
    getAnimes();
  }, []);

  const { darkMode, userToken } = props;
  if (state.loading) {
    return (
      <div
        className={"container loading-container " + (darkMode ? "bg-dark" : "")}
      >
        {state.loading ? (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          <div></div>
        )}
      </div>
    );
  } else if (!userToken) {
    return <AuthError />;
  } else {
    let columns = [];
    state.filteredAnimes.forEach((anime, idx) => {
      columns.push(
        <div className="col-4 mt-4 mb-4" key={idx}>
          <Card darkMode={darkMode} anime={anime} />
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
          resultsLength={state.filteredAnimes.length}
          handleSearch={handleSearch}
        />
        {state.message ? (
          <p className="text-danger mt-5">{state.message}</p>
        ) : (
          <div></div>
        )}
        <InfiniteScroll
          className="container mt-5"
          dataLength={state.filteredAnimes.length}
          hasMore={state.hasMore}
        >
          {<div className="row">{columns}</div>}
        </InfiniteScroll>
        {state.hasMore ? (
          <button
            type="button"
            className="btn btn-secondary mb-4 mt-4"
            onClick={getAnimes}
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
