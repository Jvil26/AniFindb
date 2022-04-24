import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Search from "../Utils/Search";
import Card from "../Cards/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthError from "../Auth-Views/AuthError";

import "../../App.css";

export default function AnimeList(props) {
  const { dark_mode, userToken } = props;
  const [state, setState] = useState({
    message: "",
    filteredAnimes: [],
    loading: true,
    page: 1,
    hasMore: true,
  });

  const handleFilter = async (e, filters) => {
    e.preventDefault();
    if (filters.length === 0) {
      return;
    }
    setState({
      ...state,
      loading: true,
    });
    let genreIds = "";
    filters.forEach((genre) => {
      if (genre.selected) {
        genreIds += genre.id + ",";
      }
    });
    let page = 1;
    genreIds = genreIds.slice(0, -1);
    try {
      const res = await fetch(
        `https://anifindb.herokuapp.com/api/search?type=anime&genreIds=${genreIds}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setState({
          ...state,
          filteredAnimes: [...data.results],
          loading: false,
          page: state.page + 1,
        });
      }
    } catch (err) {
      setState({
        message: "Unable to find any animes that contain those genres",
        loading: false,
        hasMore: false,
      });
    }
  };

  const handleSearch = async (e, inputVal) => {
    e.preventDefault();
    const searchVal = inputVal;
    if (searchVal.length === 0) {
      return;
    }
    setState({
      ...state,
      hasMore: false,
      loading: true,
    });
    try {
      const res = await fetch(
        `https://anifindb.herokuapp.com/api/anime-list/search?title=${searchVal}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const data = await res.json();
      if (res.status === 200) {
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

  const getAnimes = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      let page = state.page;
      const res = await fetch(
        `https://anifindb.herokuapp.com/api/anime-list?&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const animes = await res.json();
      if (res.status === 200) {
        setState({
          ...state,
          filteredAnimes: [...state.filteredAnimes, ...animes.top],
          loading: false,
          page: state.page + 1,
          hasMore: true,
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

  if (state.loading) {
    return (
      <div
        className={"container loading-container " + (dark_mode ? "darkBG" : "")}
      >
        {state.loading ? (
          <div className="loader">
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  } else if (!userToken) {
    return <AuthError />;
  } else {
    return (
      <div
        className={
          "container animeList-container " + (dark_mode ? "darkBG" : "")
        }
      >
        <Search
          resultsLength={state.filteredAnimes.length}
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          dark_mode={dark_mode}
          currentPage="/anime-list"
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
          <div className="card-deck">
            {state.filteredAnimes.map((anime, idx) => {
              return (
                <div className="col-4 mt-4 mb-4" key={idx}>
                  <Card dark_mode={dark_mode} anime={anime} />
                </div>
              );
            })}
          </div>
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
