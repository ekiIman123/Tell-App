import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

vi.mock('../../utils/api', () => ({
  default: {
    putAccessToken: vi.fn(),
    getAccessToken: vi.fn(),
    register: vi.fn(),
    login: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('Thunk Actions', () => {
  const dispatch = vi.fn();
  const mockAuthUser = {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  };
  const mockToken = 'mock-token';

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncSetAuthUser', () => {
    it('should dispatch actions correctly when login succeeds', async () => {
      const mockToken = 'mock-token';
      const mockAuthUser = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      };

      // Mock API calls
      api.login.mockResolvedValue(mockToken);
      api.getOwnProfile.mockResolvedValue(mockAuthUser);

      // Simulate dispatch
      const dispatch = vi.fn();
      await asyncSetAuthUser({
        email: 'john@example.com',
        password: 'password123',
      })(dispatch);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        setAuthUserActionCreator(mockAuthUser)
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should alert an error message when login fails', async () => {
      const errorMessage = 'Invalid credentials';
      api.login.mockRejectedValue(new Error(errorMessage));

      global.alert = vi.fn();
      const email = 'wrong@example.com';
      const password = 'wrong-password';

      await asyncSetAuthUser({ email, password })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalledWith({ email, password });
      expect(global.alert).toHaveBeenCalledWith(errorMessage);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncUnsetAuthUser', () => {
    it('should dispatch actions correctly', async () => {
      await asyncUnsetAuthUser()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
    });
  });
});
