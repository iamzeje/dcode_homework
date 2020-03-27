import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  getFeed,
  getCommentList,
  feedLike,
  feedUnlike,
  feedShare,
} from '../../../redux/actions/feedAction';

import LoadingView from '../../common/loading/LoadingView';
import FeedDetailView from './FeedDetailView';

import './FeedDetail.scss';

class FeedDetail extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isLoadingComment: PropTypes.bool,
    feed: PropTypes.object,
    commentList: PropTypes.array,
    error: PropTypes.object,

    getFeed: PropTypes.func,
    getCommentList: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getFeed();
    this.getCommentList();
  }

  getFeed = () => {
    this.props.getFeed();
  };

  getCommentList = () => {
    this.props.getCommentList();
  };

  onChangeEvent = ({ type, payload = {} }) => {
    if (!type) {
      return;
    }

    switch (type) {
      case 'COMMENT_ADD':
        return this.onClickBtnAddComment(payload.comment);
      case 'FEED_LIKE':
        return this.onClickIconLike(payload);
      case 'FEED_SHARE':
        return this.onClickIconShare(payload);
    }
  };

  onClickBtnAddComment = (comment) => {
    alert(`'${comment}' 댓글 등록`);
  };

  onClickIconLike = ({ feedId, isLikedFeed }) => {
    if (isLikedFeed) {
      this.props.feedLike(feedId);
    } else {
      this.props.feedUnlike(feedId);
    }
  };

  onClickIconShare = ({ feedId, snsType }) => {
    const openWindow = async () => {
      switch (snsType) {
        case 'facebook':
          alert('페이스북 공유창 오픈');
          break;
        case 'twitter':
          alert('트위터 공유창 오픈');
          break;
        case 'naver':
          alert('네이버 블로그 공유창 오픈');
          break;
        case 'gmail':
          alert('구글 이메일 공유창 오픈');
          break;
      }
    };

    openWindow().then(() => {
      this.props.feedShare(feedId);
    });
  };

  renderContent() {
    if (this.props.isLoading || this.props.isLoadingComment) {
      return <LoadingView />;
    }

    return (
      <FeedDetailView
        history={this.props.history}
        feed={this.props.feed}
        commentList={this.props.commentList}
        onChangeEvent={this.onChangeEvent}
      />
    );
  }

  render() {
    return (
      <div className="detail-page-container">
        <div className="content">{this.renderContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { feedReducer = {} } = state;
  const {
    isLoading = false,
    isLoadingComment = false,
    feed = {},
    commentList = [],
    error = null,
  } = feedReducer;

  return {
    isLoading,
    isLoadingComment,
    feed,
    commentList,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeed: () => {
      dispatch(getFeed());
    },
    getCommentList: () => {
      dispatch(getCommentList());
    },
    feedLike: (feedId) => {
      dispatch(feedLike(feedId));
    },
    feedUnlike: (feedId) => {
      dispatch(feedUnlike(feedId));
    },
    feedShare: (feedId) => {
      dispatch(feedShare(feedId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetail);
