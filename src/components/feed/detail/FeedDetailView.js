import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getString, getLocalDate } from '../../../utils/formatUtil';

import SwiperView from '../../common/swiper/SwiperView';

import './FeedDetailView.scss';

class FeedDetailView extends Component {
  static propTypes = {
    history: PropTypes.object,
    feed: PropTypes.object,
    commentList: PropTypes.array,

    onChangeEvent: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };
  }

  getTitle(str = '') {
    str = getString(str);

    const strList = str.split('\n　\n');
    if (strList.length === 0) {
      return '';
    }

    const title = strList[0];
    return title;
  }

  onInputComment = (e) => {
    // 댓글 작성
    const value = e.target.value;

    this.setState({
      comment: value,
    });
  };

  onClickBtnAddComment = () => {
    // 댓글 추가
    if (this.state.comment.length === 0) {
      return;
    }

    const addComment = async () => {
      this.props.onChangeEvent({
        type: 'COMMENT_ADD',
        payload: { comment: this.state.comment },
      });
    };
    addComment().then(() => {
      this.setState({
        comment: '',
      });
    });
  };

  onClickIconLike = () => {
    // '좋아요' 아이콘 클릭
    const { id, isLikedFeed = false } = this.props.feed;
    const payload = {
      feedId: id,
      isLikedFeed: !isLikedFeed,
    };

    this.props.onChangeEvent({
      type: 'FEED_LIKE',
      payload,
    });
  };

  onClickIconShare = (snsType) => {
    // 'SNS Share' 아이콘 클릭
    if (!snsType) {
      return;
    }

    const { id } = this.props.feed;
    const payload = {
      feedId: id,
      snsType: snsType,
    };

    this.props.onChangeEvent({
      type: 'FEED_SHARE',
      payload,
    });
  };

  renderFeed() {
    let {
      id,
      text = '',
      mdInfo = {},
      mediaList = [],
      tags = [],
      isLikedFeed = false,
      createdAt = null,
    } = this.props.feed;

    let { mdName } = mdInfo;
    mdName = getString(mdName);

    let date = getLocalDate(createdAt);

    const title = this.getTitle(text);

    if (tags.length > 0) {
      tags = tags.map((tag) => {
        return `#${tag}`;
      });
    }

    return (
      <div className="item">
        <div className="img-wrap">
          <SwiperView>
            {mediaList.map((thumbImg = {}) => {
              let thumbUrl = thumbImg.url ? getString(thumbImg.url) : '';
              const img = {
                alt: null,
                src: thumbUrl,
              };

              return <img src={thumbUrl} className="img" />;
            })}
          </SwiperView>
        </div>

        <div className="info-wrap">
          <div className="header">
            <div className="sub-title-wrap">
              <span className="name">{mdName}</span>
              <span className="date">{date}</span>
            </div>

            <div className="title-wrap">
              <h1 className="title">{title}</h1>
              <div className="title-sns" onClick={this.onClickIconLike}>
                <i className={`${isLikedFeed ? 'ico-like-circle' : 'ico-unlike-circle'}`} />
              </div>
            </div>

            <div className="sns-wrap">
              <div
                className="sns-item"
                onClick={() => {
                  this.onClickIconShare('facebook');
                }}
              >
                <i className="sns-ico ico-facebook" />
              </div>
              <div
                className="sns-item"
                onClick={() => {
                  this.onClickIconShare('twitter');
                }}
              >
                <i className="sns-ico ico-twitter" />
              </div>
              <div
                className="sns-item"
                onClick={() => {
                  this.onClickIconShare('naver');
                }}
              >
                <i className="sns-ico ico-naver" />
              </div>
              <div
                className="sns-item"
                onClick={() => {
                  this.onClickIconShare('gmail');
                }}
              >
                <i className="sns-ico ico-gmail" />
              </div>
            </div>
          </div>

          <p className="desc">{text}</p>

          <div className="tag-wrap">
            {tags.map((tag) => {
              return <span className="tag">{tag}</span>;
            })}
          </div>
        </div>
      </div>
    );
  }

  renderCommentList() {
    return (
      <div className="item-comment">
        <h2 className="header">COMMENTS</h2>

        <div className="input-wrap">
          <textarea
            className="input-text"
            value={this.state.comment}
            placeholder="내용을 입력하세요."
            onInput={this.onInputComment}
          />
          <button
            className="btn"
            disabled={this.state.comment.length === 0}
            onClick={this.onClickBtnAddComment}
          >
            댓글 등록
          </button>
        </div>

        <div className="comment-wrap">
          {this.props.commentList.map((item) => {
            let { userName = '', createdAt = null, comment = '' } = item;

            userName = getString(userName);
            createdAt = getLocalDate(createdAt);
            comment = getString(comment);

            return (
              <div className="comment">
                <div className="profile">
                  <span className="name">{userName}</span>
                  <span className="date">{createdAt}</span>
                </div>

                <div className="text">{comment}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="detail-view-container">
        {this.renderFeed()}
        {this.renderCommentList()}
      </div>
    );
  }
}

export default FeedDetailView;
