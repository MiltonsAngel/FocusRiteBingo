// Register.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../components/Register';
import Modal from 'react-modal';

// Mock uuid
jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'test-uuid')
  };
});

// Mock cookie utility
jest.mock('../utils/cookie', () => ({
  setCookieWith12HourExpiry: jest.fn(),
  getCookie: jest.fn()
}));

describe('<Register />', () => {
  beforeEach(() => {
    Modal.setAppElement(document.createElement('div'));
  });

  it('renders the registration form', () => {
    render(<Register isOpen={true} onClose={() => {}} onAddPlayer={() => {}} />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('updates input fields on change', () => {
    render(<Register isOpen={true} onClose={() => {}} onAddPlayer={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  // Add more tests for registration action and notifications
});
