import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ScrollToTop from '../common/scrollToTop/ScrollToTop';
import Header from '../header/Header';
import Main from '../main/Main';
import FeedList from '../feed/FeedList';
import FeedDetail from '../feed/detail/FeedDetail';

import './App.scss';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/feed" component={FeedList} />
            <Route path="/feed/:id" component={FeedDetail} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default connect()(App);
