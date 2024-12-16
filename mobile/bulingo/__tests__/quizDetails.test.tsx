import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import QuizDetails from '@/app/(tabs)/quizzes/quizDetails';
import TokenManager from '@/app/TokenManager';

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ id: '1' })),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

jest.mock('@/app/TokenManager', () => ({
  __esModule: true,
  default: {
    authenticatedFetch: jest.fn(),
    getUsername: jest.fn(),
  },
}));

describe('QuizDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays the correct error message when fetching data fails', async () => {
    // Mock the API response with an error
    (TokenManager.authenticatedFetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({
        message: 'Failed to parse URL from undefined/quiz/1/',
      }),
    });

    const { getByText } = render(<QuizDetails />);

    // Check for the correct error message
    await waitFor(() => {
      expect(
        getByText(
          'Error: An error occurred while fetching quiz details. Please try again. Error: Failed to parse URL from undefined/quiz/1/'
        )
      ).toBeTruthy();
    });
  });
});
