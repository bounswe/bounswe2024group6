import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CommentCard from './commentcard';

test('renders the commentcard and handles press', () => {
  const mockFn = jest.fn();

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

  expect(mockFn).toHaveBeenCalled(); // Verify the onPress function is called
});
