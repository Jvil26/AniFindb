import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Search from "./Search";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import AuthError from "./AuthError";
import "../App.css";

export default function CharList(props) {
  const [state, setState] = useState({
    message: "",
    characters: [],
    filteredChars: [],
    loading: true,
    page: 1,
    hasMore: true,
    currentFilter: "manga",
  });

  const handleSearch = async (e, inputVal, searchState) => {
    try {
      e.preventDefault();
      setState({
        hasMore: false,
        loading: true,
      });
      const searchVal = inputVal;
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
      if (res.status !== 200) {
        setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        setState({
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

  const getChars = async (filterType) => {
    try {
      setState({
        loading: true,
      });
      let type = "";
      if (filterType) {
        type = filterType;
      } else {
        type = "character";
      }
      const page = state.page;
      const subtype = "bypopularity";
      const res = await fetch(
        `http://localhost:5000/api/character-list?subtype=${subtype}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const characters = await res.json();
      if (res.status !== 200) {
        setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        setState({
          characters: [...state.filteredChars, ...characters.top],
          filteredChars: [...state.filteredChars, ...characters.top],
          loading: false,
          page: state.page + 1,
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
    state.filteredChars.forEach((char, idx) => {
      columns.push(
        <div className="col-4 mt-4 mb-4" key={idx}>
          <Card darkMode={darkMode} character={char} />
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
          resultsLength={state.filteredChars.length}
          handleSearch={handleSearch}
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
          {<div className="row">{columns}</div>}
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
