// NumberDisplay.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import NumberDisplay from '../components/NumberDisplay';

jest.useFakeTimers();

describe('NumberDisplay', () => {
  test('renders the current number correctly', () => {
    render(<NumberDisplay currentNumber={25} newGameMsg={null} />);
    expect(screen.getByText('Last Number Called')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  test('displays and clears the new game message after a delay', () => {
    const newGameMsg = 'New Game Started';
    render(<NumberDisplay currentNumber={0} newGameMsg={newGameMsg} />);

    expect(screen.getByText(newGameMsg)).toBeInTheDocument();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(screen.queryByText(newGameMsg)).toBeInTheDocument();
  });

});

jest.useRealTimers();
