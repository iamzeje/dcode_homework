import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getFeedList } from '../../redux/actions/feedAction';

import LoadingView from '../common/loading/LoadingView';
import FeedListView from './FeedListView';

import './FeedList.scss';

class FeedList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    feedList: PropTypes.array,
    error: PropTypes.object,

    getFeedList: PropTypes.func,
    feedLike: PropTypes.func,
    feedShare: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getFeedList();
  }

  getFeedList = () => {
    this.props.getFeedList();
  };

  renderContent() {
    if (this.props.isLoading) {
      return <LoadingView />;
    }

    return <FeedListView history={this.props.history} feedList={this.props.feedList} />;
  }

  render() {
    return (
      <div className="feed-list-container">
        <div className="header">
          <h1 className="title">FEED</h1>
          <h3 className="desc">패션 피드 목록 입니다.</h3>
        </div>
        <div className="content">{this.renderContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoading = false, feedList = [], error = null } = state.feedReducer || {};

  return {
    isLoading,
    feedList,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedList: () => {
      dispatch(getFeedList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
