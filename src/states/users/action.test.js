/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should call api.register with correct parameters when registration is successful
 *  - should alert error message when registration fails
 */

import { describe, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

vi.mock('../../utils/api');

describe('asyncRegisterUser', () => {
  it('should call api.register with correct parameters when registration is successful', async () => {
    // Arrange
    const fakeUser = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    api.register.mockResolvedValue(fakeUser);

    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
    };

    // Act
    await asyncRegisterUser(userData)();

    // Assert
    expect(api.register).toHaveBeenCalledWith(userData);
  });

  it('should alert error message when registration fails', async () => {
    // Arrange
    const fakeError = new Error('Failed to register user');
    api.register.mockRejectedValue(fakeError);

    const userData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'securepassword',
    };

    global.alert = vi.fn(); // Mock global alert

    // Act
    await asyncRegisterUser(userData)();

    // Assert
    expect(api.register).toHaveBeenCalledWith(userData);
    expect(global.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
