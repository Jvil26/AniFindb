import React, { Component } from "react";

export default class Search extends Component {
  state = {
    animes: [],
    message: "",
  };

  render() {
    const { handleSearch, resultsLength } = this.props;
    return (
      <section class="intro">
        <div class="mask d-flex align-items-center h-100">
          <div class="container-fluid">
            <div id="accordion">
              <div class="row">
                <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                  <div
                    class="card"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <div class="card-header">
                      <div class="input-group input-group-lg">
                        <input
                          type="text"
                          class="form-control form-control-lg rounded"
                          placeholder="Type Keywords"
                          aria-label="Type Keywords"
                          aria-describedby="basic-addon2"
                          onChange={handleSearch}
                        />
                        <span
                          class="input-group-text border-0"
                          id="basic-addon2"
                        >
                          <i class="fas fa-search"></i>
                        </span>
                      </div>
                    </div>
                    <div
                      id="collapseOne"
                      class="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div class="card-body p-4">
                        <h6 class="text-muted text-uppercase mt-3 mb-4">
                          ADVANCED SEARCH
                        </h6>
                        <div class="row">
                          <div class="col-md-4 mb-3">
                            <div class="dropdown">
                              <a
                                class="btn btn-outline-info btn-lg btn-block dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Accessories
                              </a>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-md-4 mb-3">
                            <div class="dropdown">
                              <a
                                class="btn btn-outline-info btn-lg btn-block dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink1"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Color
                              </a>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuLink1"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-md-4 mb-3">
                            <div class="dropdown">
                              <a
                                class="btn btn-outline-info btn-lg btn-block dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink2"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Size
                              </a>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuLink2"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4 mb-3">
                            <div class="dropdown">
                              <a
                                class="btn btn-outline-info btn-lg btn-block dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink3"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Sale
                              </a>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuLink3"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-md-4 mb-3">
                            <div class="dropdown">
                              <a
                                class="btn btn-outline-info btn-lg btn-block dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink4"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Time
                              </a>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuLink4"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-md-4 mb-3">
                            <div class="dropdown">
                              <a
                                class="btn btn-outline-info btn-lg btn-block dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink5"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Type
                              </a>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuLink5"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-4">
                          <p class="text-muted mb-0">
                            <span class="text-info">{resultsLength} </span>
                            results
                          </p>
                          <div>
                            <button
                              type="button"
                              class="btn btn-link text-body"
                              data-mdb-ripple-color="dark"
                            >
                              Reset
                            </button>
                            <button type="button" class="btn btn-info">
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
      </section>
    );
  }
}
