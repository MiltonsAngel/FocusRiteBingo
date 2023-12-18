// ChatBox.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import ChatBox from '../components/ChatBox';

describe('ChatBox', () => {
  const mockMessages = [
    { sender: 'Alice', text: 'Hello there!' },
    { sender: 'Bob', text: 'Hi, Alice!' }
  ];

  test('renders messages correctly', () => {
    render(<ChatBox messages={mockMessages} sendMessage={() => {}} />);

    mockMessages.forEach(msg => {
      expect(screen.getByText(`${msg.sender}: ${msg.text}`)).toBeInTheDocument();
    });
  });

  test('updates input field correctly', () => {
    render(<ChatBox messages={mockMessages} sendMessage={() => {}} />);
    const input = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(input, { target: { value: 'New message' } });
    expect(input.value).toBe('New message');
  });

  test('calls sendMessage when form is submitted', () => {
    const mockSendMessage = jest.fn();
    render(<ChatBox messages={mockMessages} sendMessage={mockSendMessage} />);

    const input = screen.getByPlaceholderText('Type a message...');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'New message' } });
    fireEvent.submit(form);

    expect(mockSendMessage).toHaveBeenCalledWith('New message');
  });

  test('clears input field after sending a message', () => {
    const mockSendMessage = jest.fn();
    render(<ChatBox messages={mockMessages} sendMessage={mockSendMessage} />);
    
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'New message' } });

    fireEvent.submit(screen.getByRole('form'));
    expect(input.value).toBe('');
  });
});
