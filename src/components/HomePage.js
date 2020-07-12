import React, { Component } from "react";
import { Link } from "react-router-dom";

export class HomePage extends Component {
  render() {
    return (
      <div>
        <section id="hero">
          <div className="hero-container">
            <div
              id="heroCarousel"
              className="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <ol className="carousel-indicators" id="hero-carousel-indicators">
                <li
                  data-target="#heroCarousel"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#heroCarousel"
                  data-slide-to="1"
                  className=""
                ></li>
                <li
                  data-target="#heroCarousel"
                  data-slide-to="2"
                  className=""
                ></li>
                <li
                  data-target="#heroCarousel"
                  data-slide-to="3"
                  className=""
                ></li>
                <li
                  data-target="#heroCarousel"
                  data-slide-to="4"
                  className=""
                ></li>
                <li
                  data-target="#heroCarousel"
                  data-slide-to="5"
                  className=""
                ></li>
              </ol>

              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <div className="carousel-container">
                    <div className="carousel-content">
                      <Link
                        to="/"
                        className="hero-logo animate__animated animate__fadeIn"
                      >
                        <img
                          src={require("./pathfinderlogo.png")}
                          alt="not found"
                        />
                      </Link>
                      <h1 className="animate__animated animate__zoomIn">
                        Welcome To PathFinder
                      </h1>
                      <h2 className="animate__animated animate__fadeInUp">
                        Where you can visualize various path finding algorithms!
                      </h2>
                      <Link
                        to="/pathfinder"
                        className="btn-get-started animate__animated animate__fadeInUp"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="carousel-container">
                    <div className="carousel-content">
                      <h1 className="animate__animated animate__fadeInDown">
                        What is this application about?
                      </h1>
                      <p className="animate__animated animate__fadeInUp">
                        This application visualizes various pathfinding
                        algorithms. At its core, a pathfinding algorithm finds
                        the shortest path between two given points. <br />
                        The algorithms in the application are adapted on a 2D
                        grid where the cost from moving from one node to another
                        is 1.
                      </p>
                      <div style={{ maxWidth: "200px", margin: "auto" }}>
                        <img
                          className="img-fluid"
                          src={require("./path.png")}
                          alt="not found"
                        />
                      </div>
                      <Link
                        to="/pathfinder"
                        className="btn-get-started animate__animated animate__fadeInUp"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="carousel-container">
                    <div className="carousel-content">
                      <h1 className="animate__animated animate__fadeInDown">
                        About the algorithms
                      </h1>
                      <p className="animate__animated animate__fadeInUp">
                        <span className="bold">Djkstra's: </span> A very popular
                        weighted algorithm for finding the shortest path from a
                        starting node to a target node.The algorithm creates a
                        tree of shortest paths from the starting vertex, the
                        source, to all other points in the graph.
                        <br />
                        <span className="bold">Astar (A*): </span> It is an
                        informed search algorithm, as it uses information about
                        path cost and also uses heuristics to find the solution.
                        It is agruably one of the best pathfinding algorithms
                        and it is much faster than Djkstra.
                        <br />
                        <span className="bold">
                          Breadth First Search (BFS):{" "}
                        </span>{" "}
                        It is a great algorithm and guarantees shortest path. It
                        starts at the source node, and explores all of the
                        neighbor nodes at the present depth prior to moving on
                        to the nodes at the next depth level.
                        <br />
                        <span className="bold">Depth First Search (DFS): </span>
                        Not a good algorithm for path finding. The DFS algorithm
                        is a recursive algorithm that uses the idea of
                        backtracking. It involves exhaustive searches of all the
                        nodes by going ahead, if possible, else by backtracking.
                      </p>

                      <Link
                        to="/pathfinder"
                        className="btn-get-started animate__animated animate__fadeInUp"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="carousel-container">
                    <div className="carousel-content">
                      <h1 className="animate__animated animate__fadeInDown">
                        Adding Walls
                      </h1>
                      <p className="animate__animated animate__fadeInUp">
                        Click on a grid to add a wall. Click and drag the mouse
                        to add several walls along the path. You can also
                        generate a random maze by clicking on Generate Maze
                        button.
                      </p>
                      <h2>
                        Walls are impenetrable, meaning that a path cannot cross
                        through them.
                      </h2>
                      <Link
                        to="/pathfinder"
                        className="btn-get-started animate__animated animate__fadeInUp"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="carousel-container">
                    <div className="carousel-content">
                      <h1 className="animate__animated animate__fadeInDown">
                        Changing the start and target node position
                      </h1>
                      <p className="animate__animated animate__fadeInUp">
                        Just click and drag the particular node to your desired
                        position. The algorithms will find the shortest path
                        from this new start or to the new target position.
                      </p>

                      <Link
                        to="/pathfinder"
                        className="btn-get-started animate__animated animate__fadeInUp"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="carousel-container">
                    <div className="carousel-content">
                      <h1 className="animate__animated animate__fadeInDown">
                        Enjoy!!
                      </h1>
                      <p className="animate__animated animate__fadeInUp">
                        Hope you have fun playing around with this application!
                      </p>

                      <Link
                        to="/pathfinder"
                        className="btn-get-started animate__animated animate__fadeInUp"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <a
                className="carousel-control-prev"
                href="#heroCarousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon icofont-thin-double-left"
                  aria-hidden="true"
                ></span>
                <h1>
                  <i className="fas fa-angle-double-left"></i>
                </h1>
              </a>

              <a
                className="carousel-control-next"
                href="#heroCarousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon icofont-thin-double-right"
                  aria-hidden="true"
                ></span>
                <h1>
                  <i className="fas fa-angle-double-right"></i>
                </h1>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
