import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
};

// function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
//   return {
//     type: ActionType.TOGGLE_VOTE_THREAD,
//     payload: {
//       threadId,
//       userId,
//       voteType,
//     },
//   };
// }

// function asyncToggleVoteThread(threadId, voteType) {
//   return async (dispatch, getState) => {
//     const { authUser } = getState();
//     const previousVoteType =
//       getState().threads.find((thread) => thread.id === threadId)?.voteType ||
//       0;

//     dispatch(
//       toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType })
//     );

//     try {
//       await api.voteThread(threadId, voteType, authUser.token);
//     } catch (error) {
//       alert(error.message);
//       dispatch(
//         toggleVoteThreadActionCreator({
//           threadId,
//           userId: authUser.id,
//           voteType: previousVoteType,
//         })
//       );
//     }
//   };
// }
