/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state
 *  - should handle SET_AUTH_USER
 *  - should handle UNSET_AUTH_USER
 *
 */

import { describe, it, expect, vi } from 'vitest';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';
import authUserReducer from './reducer';
import api from '../../utils/api';

// Mock the api functions
vi.mock('../../utils/api', () => ({
  login: vi.fn(),
  putAccessToken: vi.fn(),
  getOwnProfile: vi.fn(),
}));

describe('authUserReducer', () => {
  const initialState = null;
  const mockAuthUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  it('should return the initial state', () => {
    expect(authUserReducer(undefined, {})).toBe(initialState);
  });

  it('should handle SET_AUTH_USER', () => {
    const action = setAuthUserActionCreator(mockAuthUser);
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(mockAuthUser);
  });

  it('should handle UNSET_AUTH_USER', () => {
    const action = unsetAuthUserActionCreator();
    const newState = authUserReducer(mockAuthUser, action);
    expect(newState).toBeNull();
  });
});
