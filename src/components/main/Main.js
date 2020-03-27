import React, { Component } from 'react';
import './Main.scss';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
          <h1 className="title">MAIN</h1>
          <h3 className="desc">메인 입니다.</h3>
        </div>
      </div>
    );
  }
}

export default Main;
