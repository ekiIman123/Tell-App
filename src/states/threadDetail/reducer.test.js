import { describe, it, expect } from 'vitest';
import talkDetailReducer from './reducer';
import { ActionType } from './action';

describe('talkDetailReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = talkDetailReducer(initialState, action);

    // Assert
    expect(nextState).toBe(initialState);
  });

  it('should set the talkDetail when RECEIVE_TALK_DETAIL action is dispatched', () => {
    // Arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_TALK_DETAIL,
      payload: {
        talkDetail: {
          id: 'thread-1',
          title: 'Test Thread',
          content: 'This is a test thread.',
          likes: [],
          comments: [],
        },
      },
    };

    // Act
    const nextState = talkDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.talkDetail);
  });

  it('should clear the talkDetail when CLEAR_TALK_DETAIL action is dispatched', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Test Thread',
      content: 'This is a test thread.',
      likes: [],
      comments: [],
    };
    const action = {
      type: ActionType.CLEAR_TALK_DETAIL,
    };

    // Act
    const nextState = talkDetailReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should toggle the like status when TOGGLE_LIKE_TALK_DETAIL action is dispatched', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Test Thread',
      content: 'This is a test thread.',
      likes: ['user-1', 'user-2'],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_LIKE_TALK_DETAIL,
      payload: {
        userId: 'user-2',
      },
    };

    // Act
    const nextState = talkDetailReducer(initialState, action);

    // Assert
    expect(nextState.likes).toEqual(['user-1']);
  });

  it('should add a comment when ADD_COMMENT_TO_TALK_DETAIL action is dispatched', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Test Thread',
      content: 'This is a test thread.',
      likes: [],
      comments: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT_TO_TALK_DETAIL,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'This is a comment.',
          userId: 'user-1',
        },
      },
    };

    // Act
    const nextState = talkDetailReducer(initialState, action);

    // Assert
    expect(nextState.comments).toEqual([action.payload.comment]);
  });
});
