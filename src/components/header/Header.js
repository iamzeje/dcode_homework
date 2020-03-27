import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header className="header-container">
        <div className="nav-bar">
          <div className="logo-wrap">
            <h1>
              <Link to="/">
                <span className="logo">d.code</span>
              </Link>
            </h1>
          </div>
          <div className="menu-wrap">
            <ul>
              <li className="menu">
                <Link to="/feed">
                  <span className="menu-text">FEED</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
