import React, { useEffect, useState } from "react";
import { anime_genres, manga_genres } from "../../FilterGenres";
import "../../App.css";

const initState = {
  genreFilters: [],
  inputVal: "",
};

export default function Search(props) {
  const [state, setState] = useState({
    genreFilters: anime_genres,
    inputVal: initState.inputVal,
  });

  const { dark_mode, handleSearch, handleFilter, resultsLength, currentPage } =
    props;

  const handleReset = (e) => {
    setState({
      genreFilters: state.genreFilters.map((genre) => ({
        ...genre,
        selected: false,
      })),
    });
  };

  const handleChange = (e) => {
    const { id } = e.target;
    setState({
      ...state,
      genreFilters: state.genreFilters.map((genre) => ({
        ...genre,
        selected: genre.id === id ? !genre.selected : genre.selected,
      })),
    });
  };

  useEffect(() => {
    if (currentPage === "/anime-list") {
      setState({
        ...state,
        genreFilters: anime_genres,
      });
    } else if (currentPage === "/manga-list") {
      setState({
        ...state,
        genreFilters: manga_genres,
      });
    }
  }, []);
  let columns = [];
  state.genreFilters.forEach((genre, idx) => {
    columns.push(
      <div className="genres_columns" key={idx}>
        <div className="form-check">
          <input
            className="form-check-input"
            name="genreFilters"
            type="checkbox"
            id={genre.id}
            checked={genre.selected}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={genre.id}>
            {genre.name}
          </label>
        </div>
      </div>
    );
    if ((idx + 1) % 5 === 0) {
      columns.push(<div className="w-100" key={idx + 200}></div>);
    }
  });

  const { inputVal, genreFilters } = state;
  return (
    <section className="intro">
      <div className="mask d-flex align-items-center h-100">
        <div className="container">
          <div id="accordion">
            <div className="accordion-item">
              <div className="row">
                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                  <div
                    className={
                      "card " + (dark_mode ? "dark2BG text-white" : "")
                    }
                  >
                    <form
                      onSubmit={(e) => {
                        handleSearch(e, inputVal);
                      }}
                    >
                      <div className="card-header">
                        <div className="form-group input-group input-group-lg">
                          <input
                            type="text"
                            className="form-control form-control-lg rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                              setState({ ...state, inputVal: e.target.value });
                            }}
                          />
                          <span className="input-group-text border-0">
                            <button className="fabutton">
                              <i className={"fas fa-search"} type="submit"></i>
                            </button>
                          </span>
                        </div>
                        {currentPage === "/manga-list" ||
                        currentPage === "/anime-list" ? (
                          <button
                            className="border-0 accordion-header accordion-button"
                            id="headingOne"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <i
                              className="fas fa-filter mt-3 pr-1"
                              type="button"
                            ></i>
                            Filter
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </form>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <form
                        onSubmit={(e) => {
                          handleFilter(e, genreFilters);
                        }}
                      >
                        <div className="accordion-body">
                          <div className="card-body p-4">
                            <h6
                              className={
                                "text-uppercase mt-3 mb-4 " +
                                (dark_mode ? "text-light" : "text-muted")
                              }
                            >
                              ADVANCED SEARCH
                            </h6>
                            <div className="row d-flex justify-content-center">
                              <div className="card-title">Genres</div>
                            </div>
                            <div className="form-group" controlid="genres">
                              <div className="genres_row">{columns}</div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <p
                                className={
                                  "mb-0 " + (!dark_mode ? "text-muted" : "")
                                }
                              >
                                <span
                                  className={
                                    "text-info " +
                                    (dark_mode ? "text-white" : "")
                                  }
                                >
                                  {resultsLength}{" "}
                                </span>
                                results
                              </p>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-link text-body"
                                  data-mdb-ripple-color="dark"
                                  onClick={handleReset}
                                >
                                  <span
                                    className={dark_mode ? "text-white" : ""}
                                  >
                                    Reset
                                  </span>
                                </button>
                                <button type="submit" className="btn btn-info">
                                  Filter
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
