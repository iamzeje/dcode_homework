// action types
export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST';
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS';
export const GET_FEED_LIST_FAIL = 'GET_FEED_LIST_FAIL';

export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAIL = 'GET_FEED_FAIL';

export const GET_FEED_COMMENT_LIST_REQUEST = 'GET_FEED_COMMENT_LIST_REQUEST';
export const GET_FEED_COMMENT_LIST_SUCCESS = 'GET_FEED_COMMENT_LIST_SUCCESS';
export const GET_FEED_COMMENT_LIST_FAIL = 'GET_FEED_COMMENT_LIST_FAIL';

export const FEED_LIKE = 'FEED_LIKE';
export const FEED_UNLIKE = 'FEED_UNLIKE';
export const FEED_SHARE = 'FEED_SHARE';

// action creators
const fetchFeedList = () => {
  return fetch(`/feed-list.json`);
};

const fetchFeed = () => {
  return fetch(`/feed-detail.json`);
};

const fetchCommentList = () => {
  return fetch(`/feed-comments.json`);
};

export const getFeedList = () => async (dispatch) => {
  dispatch({
    type: GET_FEED_LIST_REQUEST,
    payload: {
      isLoading: true,
      feedList: [],
      error: null,
    },
  });

  return fetchFeedList()
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: GET_FEED_LIST_SUCCESS,
        payload: {
          isLoading: false,
          feedList: res.data.list || [],
          error: null,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FEED_LIST_FAIL,
        payload: {
          isLoading: false,
          feedList: [],
          error: error,
        },
      });
    });
};

export const getFeed = () => async (dispatch) => {
  dispatch({
    type: GET_FEED_REQUEST,
    payload: {
      isLoading: true,
      feed: {},
      error: null,
    },
  });

  return fetchFeed()
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: GET_FEED_SUCCESS,
        payload: {
          isLoading: false,
          feed: res.data || {},
          error: null,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FEED_FAIL,
        payload: {
          isLoading: false,
          feed: {},
          error: error,
        },
      });
    });
};

export const getCommentList = () => async (dispatch) => {
  dispatch({
    type: GET_FEED_COMMENT_LIST_REQUEST,
    payload: {
      isLoadingComment: true,
      commentList: [],
      error: null,
    },
  });

  return fetchCommentList()
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: GET_FEED_COMMENT_LIST_SUCCESS,
        payload: {
          isLoadingComment: false,
          commentList: res.data.list || [],
          error: null,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FEED_COMMENT_LIST_FAIL,
        payload: {
          isLoadingComment: false,
          commentList: [],
          error: error,
        },
      });
    });
};

export const feedLike = (feedId) => ({
  type: FEED_LIKE,
  payload: {
    feedId,
  },
});

export const feedUnlike = (feedId) => ({
  type: FEED_UNLIKE,
  payload: {
    feedId,
  },
});

export const feedShare = (feedId) => ({
  type: FEED_SHARE,
  payload: {
    feedId,
  },
});
