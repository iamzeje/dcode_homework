import {
  GET_FEED_LIST_REQUEST,
  GET_FEED_LIST_SUCCESS,
  GET_FEED_LIST_FAIL,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAIL,
  GET_FEED_COMMENT_LIST_REQUEST,
  GET_FEED_COMMENT_LIST_SUCCESS,
  GET_FEED_COMMENT_LIST_FAIL,
  FEED_LIKE,
  FEED_UNLIKE,
  FEED_SHARE,
} from '../actions/feedAction';

const initialState = {
  isLoading: false,
  isLoadingComment: false,
  feed: {},
  feedList: [],
  commentList: [],
  error: null,
};

const getNewFeed = (feed = {}, action) => {
  switch (action.type) {
    case FEED_LIKE:
      if (feed.id === action.payload.feedId) {
        const likedCount = feed.likedCount || 0;

        return {
          ...feed,
          isLikedFeed: true,
          likedCount: likedCount + 1,
        };
      }
      return feed;

    case FEED_UNLIKE:
      if (feed.id === action.payload.feedId) {
        const likedCount = feed.likedCount || 1;

        return {
          ...feed,
          isLikedFeed: false,
          likedCount: likedCount - 1,
        };
      }
      return feed;

    case FEED_SHARE:
      if (feed.id === action.feedId) {
        const sharedCount = feed.sharedCount || 0;

        return {
          ...feed,
          sharedCount: sharedCount + 1,
        };
      }
      return feed;

    default:
      return feed;
  }
};

export default function feed_reducer(state = initialState, action) {
  const { feed = {} } = state;

  switch (action.type) {
    case GET_FEED_LIST_REQUEST:
    case GET_FEED_LIST_SUCCESS:
    case GET_FEED_LIST_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        feedList: action.payload.feedList,
        error: action.payload.error,
      };

    case GET_FEED_REQUEST:
    case GET_FEED_SUCCESS:
    case GET_FEED_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        feed: action.payload.feed,
        error: action.payload.error,
      };

    case GET_FEED_COMMENT_LIST_REQUEST:
    case GET_FEED_COMMENT_LIST_SUCCESS:
    case GET_FEED_COMMENT_LIST_FAIL:
      return {
        ...state,
        isLoadingComment: action.payload.isLoadingComment,
        commentList: action.payload.commentList,
        error: action.payload.error,
      };

    case FEED_LIKE:
      return {
        ...state,
        feed: getNewFeed(feed, action),
      };

    case FEED_UNLIKE:
      return {
        ...state,
        feed: getNewFeed(feed, action),
      };

    case FEED_SHARE:
      return {
        ...state,
        feed: getNewFeed(feed, action),
      };

    default:
      return state;
  }
}
