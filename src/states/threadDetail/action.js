import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
  ADD_COMMENT_TO_THREAD_DETAIL: 'ADD_COMMENT_TO_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentToThreadDetailActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_TO_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadsDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThreadDetailComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentToThreadDetailActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

// function toggleLikeThreadDetailActionCreator(userId) {
//   return {
//     type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
//     payload: {
//       userId,
//     },
//   };
// }
// function asyncToogleVoteThreadDetail() {
//   return async (dispatch, getState) => {
//     const { authUser, threadDetail } = getState();
//     dispatch(toggleLikeThreadDetailActionCreator(authUser.id));

//     try {
//       await api.toggleLikeThread(threadDetail.id);
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// }

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentToThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncAddThreadDetailComment,
  // toggleLikeThreadDetailActionCreator,
  // asyncToogleVoteThreadDetail,
};
