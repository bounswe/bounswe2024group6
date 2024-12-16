import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CommentCard from '../app/components/commentcard';

test('renders the commentcard and checks like button press when not logged in', () => {
  const mockFn = jest.fn();

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const { getByTestId } = render(
  <CommentCard 
    onUpvote={mockFn} 
    id={0} 
    isBookmarked={false} 
    username='test' 
    comment='test comment'
    liked={true}
    likes={15}
  />);

  const button = getByTestId('likeButton');
  fireEvent.press(button);

  expect(mockFn).not.toHaveBeenCalled(); // Verify the onPress function is called
});

test('renders commentcard and includes the username correctly', () => {
  const mockFn = jest.fn();
  const uname = 'test username';
  const comment = 'test comment';
  const { getByText } = render(
    <CommentCard 
      onUpvote={mockFn}
      id={0} 
      isBookmarked={false} 
      username={uname} 
      comment={comment}
      liked={true}
      likes={15}
    />);

  expect(getByText(uname)).toBeTruthy();
});
