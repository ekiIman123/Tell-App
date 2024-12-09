import { ActionType } from './action';

function talkDetailReducer(talkDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_TALK_DETAIL:
    return action.payload.talkDetail;
  case ActionType.CLEAR_TALK_DETAIL:
    return null;
  case ActionType.TOGGLE_LIKE_TALK_DETAIL:
    return {
      ...talkDetail,
      likes: talkDetail.likes.includes(action.payload.userId)
        ? talkDetail.likes.filter((id) => id !== action.payload.userId)
        : talkDetail.likes.concat(action.payload.userId),
    };
  case ActionType.ADD_COMMENT_TO_TALK_DETAIL:
    return {
      ...talkDetail,
      comments: [...talkDetail.comments, action.payload.comment],
    };
  default:
    return talkDetail;
  }
}

export default talkDetailReducer;
