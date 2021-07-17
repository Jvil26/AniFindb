import React, { Component } from "react";

const initState = {
  animeFilter: false,
  mangaFilter: false,
  charFilter: false,
  inputVal: "",
};

export default class Search extends Component {
  state = initState;

  handleReset = () => {
    this.setState(initState);
  };

  handleInput = (e) => {
    this.setState({
      inputVal: e.target.value,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      animeFilter: false,
      mangaFilter: false,
      charFilter: false,
    });
    this.setState({
      [e.target.id]: !this.state[e.target.id],
    });
  };

  render() {
    const { handleSearch, resultsLength } = this.props;
    const { animeFilter, mangaFilter, charFilter, inputVal } = this.state;
    return (
      <section className="intro">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div id="accordion">
              <div className="accordion-item">
                <div className="row">
                  <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <div className="card">
                      <div className="card-header">
                        <div className="input-group input-group-lg">
                          <input
                            type="text"
                            className="form-control form-control-lg rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            value={inputVal}
                            onChange={(e) => {
                              handleSearch(e);
                              this.handleInput(e);
                            }}
                          />
                          <span className="input-group-text border-0">
                            <i
                              class="fas fa-times"
                              type="button"
                              onClick={(e) => {
                                this.setState({ inputVal: "" });
                                handleSearch(e, null, true);
                              }}
                            ></i>
                          </span>
                        </div>
                        <span
                          className="border-0 accordion-header"
                          id="headingOne"
                        >
                          <i
                            className="fas fa-filter accordion-button mt-3"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          ></i>
                        </span>
                      </div>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="card-body p-4">
                            <h6 className="text-muted text-uppercase mt-3 mb-4">
                              ADVANCED SEARCH
                            </h6>
                            <div className="row d-flex justify-content-center">
                              <div className="card-title">Types</div>
                            </div>
                            <div className="form-group" controlid="filterType">
                              <div className="row">
                                <div className="col-xs-2 col-xs-offset-4 col-4">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      name="typeFilters"
                                      type="radio"
                                      id="animeFilter"
                                      checked={animeFilter}
                                      onChange={this.handleChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="animeFilter"
                                    >
                                      Anime
                                    </label>
                                  </div>
                                </div>
                                <div className="col-xs-2 col-xs-offset-4 col-4">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      name="typeFilters"
                                      type="radio"
                                      id="mangaFilter"
                                      checked={mangaFilter}
                                      onChange={this.handleChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="mangaFilter"
                                    >
                                      Manga
                                    </label>
                                  </div>
                                </div>
                                <div className="col-xs-2 col-xs-offset-4 col-4">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      name="typeFilters"
                                      type="radio"
                                      id="charFilter"
                                      checked={charFilter}
                                      onChange={this.handleChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="charFilter"
                                    >
                                      Characters
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-4 mb-3"></div>
                                <div className="col-md-4 mb-3"></div>
                                <div className="row">
                                  <div className="col-md-4 mb-3"></div>
                                  <div className="col-md-4 mb-3"></div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <p className="text-muted mb-0">
                                <span className="text-info">
                                  {resultsLength}{" "}
                                </span>
                                results
                              </p>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-link text-body"
                                  data-mdb-ripple-color="dark"
                                  onClick={this.handleReset}
                                >
                                  Reset
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={(e) => handleSearch(e, this.state)}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
}
