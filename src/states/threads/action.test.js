/* eslint-disable no-undef */
/**
 * skenario test
 *
 * - asyncAddThread thunk
 *  - should dispatch addThreadActionCreator when API call is successful
 *  - should alert error message when API call fails
 */

import { describe, it, expect, vi } from 'vitest';
import { asyncAddThread, addThreadActionCreator } from './action';
import api from '../../utils/api';

vi.mock('../../utils/api');

describe('asyncAddThread', () => {
  it('should dispatch addThreadActionCreator when API call is successful', async () => {
    // Arrange
    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    api.createThread.mockResolvedValue(fakeThread);

    const dispatch = vi.fn();
    const threadData = {
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
    };

    // Act
    await asyncAddThread(threadData)(dispatch);

    // Assert
    expect(api.createThread).toHaveBeenCalledWith(threadData);
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
  });

  it('should alert error message when API call fails', async () => {
    // Arrange
    const fakeError = new Error('Failed to create thread');
    api.createThread.mockRejectedValue(fakeError);

    const dispatch = vi.fn();
    const threadData = {
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
    };

    global.alert = vi.fn();
    // Act
    await asyncAddThread(threadData)(dispatch);

    // Assert
    expect(api.createThread).toHaveBeenCalledWith(threadData);
    expect(dispatch).not.toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
