import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuizCard from '../app/components/quizCard';
import TokenManager from '@/app/TokenManager';

test('renders the quiz card and does not handle presses if it is not logged in', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();

  const mockFetch = jest
  .spyOn(TokenManager, 'authenticatedFetch')
  .mockResolvedValueOnce(
    new Response(JSON.stringify({ data: 'Test Data' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  );

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const { getByTestId } = render(
  <QuizCard 
    id={0} 
    author='test author' 
    title='test title'
    level='A2'
    description='test description'
    liked={true}
    likes={15}
    bookmarked={true}
    onLikePress={mockFn1}    
    onBookmarkPress={mockFn2}
    onQuizPress={mockFn3}    
  />);

  const button1 = getByTestId('likeButton');
  const button2 = getByTestId('bookmarkButton');
  const button3 = getByTestId('quiz');

  fireEvent.press(button1);
  fireEvent.press(button2);
  fireEvent.press(button3);

  expect(mockFn1).not.toHaveBeenCalled(); 
  expect(mockFn2).not.toHaveBeenCalled(); 
  expect(mockFn3).toHaveBeenCalled(); 

});

test('renders quiz card and includes all the input text', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();

  const title = 'test title';
  const author = 'testauthor';
  const level = "A2";
  const desc = "test description";
  const likes = 15;

  const { getByText } = render(
    <QuizCard 
    id={0} 
    author={author}
    title={title}
    level={level}
    description={desc}
    liked={true}
    likes={15}
    onLikePress={mockFn1}  
    bookmarked={true}  
    onBookmarkPress={mockFn2}
    onQuizPress={mockFn3}    
  />);

  expect(getByText(`by ${author}`)).toBeTruthy();
  expect(getByText(level)).toBeTruthy();
  expect(getByText(likes.toString())).toBeTruthy();
});
