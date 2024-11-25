import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';
import QuizReviewQuestion from '@/app/(tabs)/quizzes/quizReview';
import TokenManager from '@/app/TokenManager';

jest.useFakeTimers();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ quizId: '1' })),
  router: { back: jest.fn(), push: jest.fn() },
}));

jest.mock('@/app/TokenManager', () => ({
    __esModule: true,
    default: {
      authenticatedFetch: jest.fn(), 
    },
  }));

describe('QuizReviewQuestion Component', () => {
  const mockQuizData = {
    quiz_progress_id: 1,
    quiz_title: 'Sample Quiz',
    question_count: 3,
    questions: [
      {
        question_number: 1,
        question: 'Mercimek',
        choices: ['Lentils', 'Tomato', 'Potato', 'Peas'],
        correct_choice: 1,
        previous_answer: 3,
      },
      {
        question_number: 2,
        question: 'Elma',
        choices: ['Apple', 'Orange', 'Banana', 'Grape'],
        correct_choice: 1,
        previous_answer: 2,
      },
      {
        question_number: 3,
        question: 'Kedi',
        choices: ['Cat', 'Dog', 'Bird', 'Fish'],
        correct_choice: 1,
        previous_answer: 4,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders quiz questions after data is loaded', async () => {
    (TokenManager.authenticatedFetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockQuizData),
    });

    const { getByText } = render(<QuizReviewQuestion />);

    await waitFor(() => {
      expect(getByText('Mercimek')).toBeTruthy();
      expect(getByText('Lentils')).toBeTruthy();
      expect(getByText('Tomato')).toBeTruthy();
      expect(getByText('Potato')).toBeTruthy();
      expect(getByText('Peas')).toBeTruthy();
    });
  });

  it('handles API error gracefully', async () => {
    (TokenManager.authenticatedFetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'Failed to fetch quiz review.' }),
    });

    const { getByText } = render(<QuizReviewQuestion />);

    await waitFor(() => {
      expect(getByText('Error: Failed to fetch quiz review.')).toBeTruthy();
    });
  });

  it('navigates to the next question', async () => {
    (TokenManager.authenticatedFetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockQuizData),
    });

    const { getByText } = render(<QuizReviewQuestion />);

    await act(async () => {
      await waitFor(() => {
        expect(getByText('Mercimek')).toBeTruthy();
      });

      fireEvent.press(getByText('Next')); 
      jest.advanceTimersByTime(1000); 
    });

    await waitFor(() => {
      expect(getByText('Elma')).toBeTruthy();
    });
  });

  it('handles the "Previous" button correctly', async () => {
    (TokenManager.authenticatedFetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockQuizData),
    });

    const { getByText } = render(<QuizReviewQuestion />);

    await act(async () => {
      await waitFor(() => {
        expect(getByText('Mercimek')).toBeTruthy();
      });

      fireEvent.press(getByText('Next')); 
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(getByText('Elma')).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByText('Previous')); 
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(getByText('Mercimek')).toBeTruthy();
    });
  });

  it('styles correct and wrong answer buttons correctly', async () => {
    (TokenManager.authenticatedFetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockQuizData),
    });

    const { getAllByTestId } = render(<QuizReviewQuestion />);

    await waitFor(() => {
      const buttons = getAllByTestId('button');
      const correctAnswerButton = buttons.find((button) => {
        const textElement = button.findByType('Text');
        return textElement.props.children === 'Lentils';
      });
      expect(correctAnswerButton.props.style).toEqual(
        expect.objectContaining({ backgroundColor: 'lightgreen' })
      );

      const wrongAnswerButton = buttons.find((button) => {
        const textElement = button.findByType('Text');
        return textElement.props.children === 'Potato';
      });
      expect(wrongAnswerButton.props.style).toEqual(
        expect.objectContaining({ backgroundColor: 'lightcoral' })
      );
    });
  });
});
