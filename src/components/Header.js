import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./favicon-32x32.png";
export class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/">
            <h4 className="navbar-brand">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
              />
              &nbsp; Pathfinder
            </h4>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
