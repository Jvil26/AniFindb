import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Search from "./Search";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import AuthError from "./AuthError";
import "../App.css";

export default function MangaList(props) {
  const [state, setState] = useState({
    message: "",
    mangas: [],
    filteredMangas: [],
    loading: true,
    page: 1,
    hasMore: true,
    currentFilter: "manga",
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
        `http://localhost:5000/api/manga-list/search?title=${searchVal}`,
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
          filteredMangas: [...data.results],
          loading: false,
        });
      }
    } catch (err) {
      setState({
        message: "Cannot find manga",
        loading: false,
        hasMore: false,
      });
    }
  };

  const getMangas = async (filterType) => {
    try {
      setState({
        ...state,
        loading: true,
      });
      let type = "";
      if (filterType) {
        type = filterType;
      } else {
        type = "manga";
      }
      const page = state.page;
      const subtype = "bypopularity";
      const res = await fetch(
        `http://localhost:5000/api/manga-list?subtype=${subtype}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": props.userToken,
          },
        }
      );
      const mangas = await res.json();
      if (res.status !== 200) {
        setState({
          message: res.message,
          loading: false,
        });
      } else if (res.status === 200) {
        setState({
          ...state,
          mangas: [...state.filteredMangas, ...mangas.top],
          filteredMangas: [...state.filteredMangas, ...mangas.top],
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
    getMangas();
  }, []);

  const { darkMode, userToken } = props;
  if (state.loading) {
    return (
      <div
        className={"container loading-container " + (darkMode ? "darkBG" : "")}
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
    state.filteredMangas.forEach((manga, idx) => {
      columns.push(
        <div className="col-4 mt-4 mb-4" key={idx}>
          <Card darkMode={darkMode} manga={manga} />
        </div>
      );
      if ((idx + 1) % 3 === 0) {
        columns.push(<div className="w-100" key={idx + 200}></div>);
      }
    });
    return (
      <div
        className={
          "container animeList-container " + (darkMode ? "darkBG" : "")
        }
      >
        <Search
          resultsLength={state.filteredMangas.length}
          handleSearch={handleSearch}
          darkMode={darkMode}
        />
        {state.message ? (
          <p className="text-danger mt-5">{state.message}</p>
        ) : (
          <div></div>
        )}
        <InfiniteScroll
          className="container mt-5"
          dataLength={state.filteredMangas.length}
          hasMore={state.hasMore}
        >
          {<div className="row">{columns}</div>}
        </InfiniteScroll>
        {state.hasMore ? (
          <button
            type="button"
            className="btn btn-secondary mb-4 mt-4"
            onClick={getMangas}
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
