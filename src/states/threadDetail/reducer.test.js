import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {
  const initialState = null;

  const mockThreadDetail = {
    id: 'thread-1',
    title: 'Sample Thread',
    comments: [],
    likes: ['user-1', 'user-2'],
  };

  const mockComment = {
    id: 'comment-1',
    userId: 'user-3',
    content: 'Great discussion!',
  };

  it('should return the initial state', () => {
    expect(threadDetailReducer(undefined, {})).toBe(initialState);
  });

  it('should handle RECEIVE_THREAD_DETAIL', () => {
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: mockThreadDetail },
    };
    const newState = threadDetailReducer(initialState, action);
    expect(newState).toEqual(mockThreadDetail);
  });

  it('should handle CLEAR_THREAD_DETAIL', () => {
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };
    const newState = threadDetailReducer(mockThreadDetail, action);
    expect(newState).toBeNull();
  });

  it('should handle ADD_COMMENT_TO_THREAD_DETAIL', () => {
    const action = {
      type: ActionType.ADD_COMMENT_TO_THREAD_DETAIL,
      payload: { comment: mockComment },
    };
    const newState = threadDetailReducer(mockThreadDetail, action);
    expect(newState.comments).toHaveLength(1);
    expect(newState.comments[0]).toEqual(mockComment);
  });
});
