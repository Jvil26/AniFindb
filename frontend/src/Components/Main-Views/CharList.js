import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Search from "../Utils/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Cards/Card";
import AuthError from "../Auth-Views/AuthError";

import "../../App.css";

export default function CharList(props) {
  const [state, setState] = useState({
    message: "",
    filteredChars: [],
    loading: true,
    page: 1,
    hasMore: true,
    currentFilter: "manga",
  });

  const handleSearch = async (e, inputVal) => {
    e.preventDefault();
    const searchVal = inputVal;
    if (searchVal.length === 0) {
      return;
    }
    setState({
      hasMore: false,
      loading: true,
    });
    try {
      const res = await fetch(
        `http://localhost:5000/api/character-list/search?title=${searchVal}`,
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
          filteredChars: [...data.results],
          loading: false,
        });
      }
    } catch (err) {
      setState({
        message: "Cannot find character",
        loading: false,
        hasMore: false,
      });
    }
  };

  const getChars = async () => {
    setState({
      loading: true,
    });
    const page = state.page;
    try {
      const res = await fetch(
        `http://localhost:5000/api/character-list?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const characters = await res.json();
      if (res.status === 200) {
        setState({
          characters: [...state.filteredChars, ...characters.top],
          filteredChars: [...state.filteredChars, ...characters.top],
          loading: false,
          page: state.page + 1,
          hasMore: true,
        });
      }
    } catch (err) {
      setState({
        message: "Failed to load mangas",
        loading: false,
        hasMore: false,
      });
    }
  };

  useEffect(() => {
    getChars();
  }, []);

  const { dark_mode, userToken } = props;
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
          resultsLength={state.filteredChars.length}
          handleSearch={handleSearch}
          dark_mode={dark_mode}
          currentPage="/character-list"
        />
        {state.message ? (
          <p className="text-danger mt-5">{state.message}</p>
        ) : (
          <div></div>
        )}
        <InfiniteScroll
          className="container mt-5"
          dataLength={state.filteredChars.length}
          hasMore={state.hasMore}
        >
          <div className="card-deck">
            {state.filteredChars.map((char, idx) => {
              return (
                <div className="col-4 mt-4 mb-4" key={idx}>
                  <Card dark_mode={dark_mode} character={char} />
                </div>
              );
            })}
          </div>{" "}
        </InfiniteScroll>
        {state.hasMore ? (
          <button
            type="button"
            className="btn btn-secondary mb-4 mt-4"
            onClick={getChars}
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
