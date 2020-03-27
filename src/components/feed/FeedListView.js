import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getString } from '../../utils/formatUtil';

import LazyLoadingImgView from '../common/lazyLoadingImg/LazyLoadingImgView';

import './FeedListView.scss';

class FeedListView extends Component {
  static propTypes = {
    history: PropTypes.object,
    feedList: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  onClickItem = (feedId) => {
    // 상세 페이지로 이동
    this.props.history.push(`/feed/${feedId}`);
  };

  renderListItem() {
    const list = this.props.feedList || [];
    if (list.length === 0) {
      return;
    }

    return list.map((item) => {
      if (!item) {
        return;
      }

      const {
        id,
        text = '',
        mdInfo = {},
        mediaList = [],
        tags = [],
        likedCount = 0,
        replyCount = 0,
        sharedCount = 0,
        isLikedFeed = false,
      } = item;

      let { mdName } = mdInfo;
      mdName = getString(mdName);

      let desc = getString(text);

      let title = mdName;
      if (tags.length > 0) {
        let titles = tags.map((tag) => {
          return `#${tag}`;
        });
        title = titles.join(`\n`);
      }

      let thumbUrl = '';
      thumbUrl = mediaList[0] ? getString(mediaList[0].url) : '';

      const img = {
        alt: null,
        src: thumbUrl,
      };

      return (
        <div
          className="item"
          onClick={() => {
            this.onClickItem(id);
          }}
        >
          <div className="img-wrap">
            <LazyLoadingImgView img={img} />
          </div>

          <div className="content-wrap">
            <h1 className="title">{title}</h1>
            <p className="desc">{desc}</p>
          </div>

          <div className="sns-item-wrap">
            <div className="sns-item">
              <i className={`sns-ico ${isLikedFeed ? 'ico-like' : 'ico-unlike'}`} />
              <span className="sns-count">{likedCount}</span>
            </div>
            <div className="sns-item">
              <i className="sns-ico ico-comment" />
              <span className="sns-count">{replyCount}</span>
            </div>
            <div className="sns-item">
              <i className="sns-ico ico-share" />
              <span className="sns-count">{sharedCount}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="list-view-container">
        <div className="item-wrap">{this.renderListItem()}</div>
      </div>
    );
  }
}

export default FeedListView;
