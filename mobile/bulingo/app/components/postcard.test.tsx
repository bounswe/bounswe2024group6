import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostCard from './postcard';

test('renders the post card and handles presses', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();



  const { getByTestId } = render(
  <PostCard 
    onUpvote={mockFn1} 
    id={'test id'} 
    isBookmarked={false} 
    author='test author' 
    title='test title'
    liked={true}
    likes={15}
    tags={['tag1', 'tag2', 'tag3']}
    onBookmark={mockFn2}
    feedOrPost={''}
    onPress={mockFn3}    
  />);

  const button1 = getByTestId('likeButton');
  const button2 = getByTestId('bookmarkButton');
  const button3 = getByTestId('card');

  fireEvent.press(button1);
  fireEvent.press(button2);
  fireEvent.press(button3);

  expect(mockFn1).toHaveBeenCalled(); 
  expect(mockFn2).toHaveBeenCalled(); 
  expect(mockFn3).toHaveBeenCalled(); 

});

test('renders post card and includes all the input text', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();

  const title = 'test title';
  const author = 'testauthor';
  const tags = ['tag1', 'tag2', 'tag3'];

  const { getByText } = render(
    <PostCard 
      onUpvote={mockFn1} 
      id={'test id'} 
      isBookmarked={false} 
      author={author}
      title={title}
      liked={true}
      likes={15}
      tags={tags}
      onBookmark={mockFn2}
      feedOrPost={''}
      onPress={mockFn3}    
    />);

  expect(getByText(title)).toBeTruthy();
  expect(getByText(`by ${author}`)).toBeTruthy();
  tags.forEach(tag => expect(getByText(tag)).toBeTruthy());
});
