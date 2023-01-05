import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Search from "../Utils/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Cards/Card";
import AuthError from "../Auth-Views/AuthError";

import "../../App.css";

export default function MangaList(props) {
  const [state, setState] = useState({
    message: "",
    filteredMangas: [],
    loading: true,
    page: 1,
    hasMore: true,
    currentFilter: "manga",
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
        `${process.env.REACT_APP_SERVER_URL}/api/search?type=manga&genreIds=${genreIds}&page=${page}`,
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
          filteredMangas: [...data.data],
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
        `${process.env.REACT_APP_SERVER_URL}/api/manga-list/search?title=${searchVal}`,
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
          filteredMangas: [...data.data],
          loading: false,
          hasMore: true,
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

  const getMangas = async () => {
    setState({
      ...state,
      loading: true,
    });
    const page = state.page;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/manga-list?&page=${page}`,
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
        console.log(mangas.data);
        setState({
          ...state,
          mangas: [...state.filteredMangas, ...mangas.data],
          filteredMangas: [...state.filteredMangas, ...mangas.data],
          loading: false,
          page: state.page + 1,
          hasMore: mangas.has_next_page,
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
          resultsLength={state.filteredMangas.length}
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          dark_mode={dark_mode}
          currentPage="/manga-list"
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
          <div className="card-deck">
            {state.filteredMangas.map((manga, idx) => {
              return (
                <div className="col-4 mt-4 mb-4" key={idx}>
                  <Card dark_mode={dark_mode} manga={manga} />
                </div>
              );
            })}
          </div>{" "}
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
