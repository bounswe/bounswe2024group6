import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserCard from '../app/(tabs)/profile/userCard';

test('renders the user card and handles presses', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();

  const { getByTestId } = render(
  <UserCard 
    username='User123' 
    name='Jake'
    level='A2'
    profilePictureUri='https://testuri.com'
    buttonText="Follow"
    buttonStyleNo={1}
    onButtonPress={mockFn1}    
    onCardPress={mockFn2}
  />);

  const button1 = getByTestId('button');

  fireEvent.press(button1);

  expect(mockFn1).toHaveBeenCalled();
});

test('renders the user card and includes all the input text', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();

  const username = 'User123';
  const name = 'Jake';
  const level = 'A2'
  const buttonText = "Unfollow";

  const { getByText } = render(
    <UserCard 
    username={username}
    name={name}
    level={level}
    profilePictureUri='https://testuri.com'
    buttonText={buttonText}
    buttonStyleNo={1}
    onButtonPress={mockFn1}    
    onCardPress={mockFn2}
  />);

  expect(getByText(username)).toBeTruthy();
  expect(getByText(name)).toBeTruthy();
  expect(getByText(level)).toBeTruthy();
  expect(getByText(buttonText)).toBeTruthy();
});