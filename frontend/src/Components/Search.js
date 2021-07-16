import React, { Component } from "react";

const initState = {
  message: "",
  animeFilter: false,
  mangaFilter: false,
  charFilter: false,
};

export default class Search extends Component {
  state = initState;

  handleReset = () => {
    this.setState(initState);
  };

  handleChange = (e) => {
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
    const { message, animeFilter, mangaFilter, charFilter } = this.state;
    return (
      <section class="intro">
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div id="accordion">
              <div class="accordion-item">
                <div class="row">
                  <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <div class="card">
                      <div class="card-header">
                        <div class="input-group input-group-lg">
                          <input
                            type="text"
                            class="form-control form-control-lg rounded"
                            placeholder="Search Animes"
                            aria-label="Search Animes"
                            aria-describedby="basic-addon2"
                            onChange={handleSearch}
                          />
                          <span
                            class="input-group-text border-0 accordion-header"
                            id="headingOne"
                            id="basic-addon2"
                          >
                            <i
                              class="fas fa-filter accordion-button"
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
                      </div>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <div class="card-body p-4">
                            <h6 class="text-muted text-uppercase mt-3 mb-4">
                              ADVANCED SEARCH
                            </h6>
                            <div class="row d-flex justify-content-center">
                              <div className="card-title">Types</div>
                            </div>
                            <form
                              className="search-form"
                              onSubmit={(e) => this.handleSearch(e)}
                            >
                              <div
                                className="form-group"
                                controlId="filterType"
                              >
                                <div class="row">
                                  <div class="col-xs-2 col-xs-offset-4 col-4">
                                    <div class="form-check form-check-inline">
                                      <input
                                        class="form-check-input"
                                        name="typeFilters"
                                        type="radio"
                                        id="animeFilter"
                                        checked={animeFilter}
                                        onChange={this.handleChange}
                                      />
                                      <label
                                        class="form-check-label"
                                        for="animeFilter"
                                      >
                                        Anime
                                      </label>
                                    </div>
                                  </div>
                                  <div class="col-xs-2 col-xs-offset-4 col-4">
                                    <div class="form-check form-check-inline">
                                      <input
                                        class="form-check-input"
                                        name="typeFilters"
                                        type="radio"
                                        id="mangaFilter"
                                        checked={mangaFilter}
                                        onChange={this.handleChange}
                                      />
                                      <label
                                        class="form-check-label"
                                        for="mangaFilter"
                                      >
                                        Manga
                                      </label>
                                    </div>
                                  </div>
                                  <div class="col-xs-2 col-xs-offset-4 col-4">
                                    <div class="form-check form-check-inline">
                                      <input
                                        class="form-check-input"
                                        name="typeFilters"
                                        type="radio"
                                        id="charFilter"
                                        checked={charFilter}
                                        onChange={this.handleChange}
                                      />
                                      <label
                                        class="form-check-label"
                                        for="charFilter"
                                      >
                                        Characters
                                      </label>
                                    </div>
                                  </div>
                                  <div class="col-md-4 mb-3"></div>
                                  <div class="col-md-4 mb-3"></div>
                                  <div class="row">
                                    <div class="col-md-4 mb-3"></div>
                                    <div class="col-md-4 mb-3"></div>
                                  </div>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-items-center mt-4">
                                <p class="text-muted mb-0">
                                  <span class="text-info">
                                    {resultsLength}{" "}
                                  </span>
                                  results
                                </p>
                                <div>
                                  <button
                                    type="button"
                                    class="btn btn-link text-body"
                                    data-mdb-ripple-color="dark"
                                    onClick={this.handleReset}
                                  >
                                    Reset
                                  </button>
                                  <button type="submit" class="btn btn-info">
                                    Search
                                  </button>
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
          </div>
        </div>
      </section>
    );
  }
}
