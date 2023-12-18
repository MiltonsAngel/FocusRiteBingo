// GameBoard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import GameBoard from '../components/GameBoard';

describe('GameBoard', () => {
  test('renders correctly', () => {
    const mockCalledNumbers = [10, 20, 30];
    render(<GameBoard calledNumbers={mockCalledNumbers} />);

    expect(screen.getByText('Called Numbers')).toBeInTheDocument();
    const numberCells = screen.getAllByClass('number-cell');
    expect(numberCells.length).toBe(mockCalledNumbers.length);
    numberCells.forEach((cell, index) => {
      expect(cell.textContent).toBe(mockCalledNumbers[index].toString());
    });
  });

  test('displays no numbers when calledNumbers is empty', () => {
    render(<GameBoard calledNumbers={[]} />);
    const numberCells = screen.queryAllByClass('number-cell');
    expect(numberCells.length).toBe(0);
  });

});
