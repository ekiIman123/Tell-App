/**
 * test scenario for usersReducer
 *
 * - userReducers function
 *  - should return the initial state when given an unknown action
 *  - should return the users when given RECEIVE_USERS action
 *  - should replace existing state with new users when RECEIVE_USERS action is dispatched
 *
 */

import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given RECEIVE_USERS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          { id: 'user-1', name: 'Alice', email: 'alice@example.com' },
          { id: 'user-2', name: 'Bob', email: 'bob@example.com' },
        ],
      },
    };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.users);
  });

  it('should replace existing state with new users when RECEIVE_USERS action is dispatched', () => {
    // Arrange
    const initialState = [
      { id: 'user-1', name: 'Alice', email: 'alice@example.com' },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          { id: 'user-2', name: 'Bob', email: 'bob@example.com' },
          { id: 'user-3', name: 'Charlie', email: 'charlie@example.com' },
        ],
      },
    };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.users);
  });
});
