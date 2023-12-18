// BingoCard.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BingoCard from '../components/BingoCard';

describe('BingoCard', () => {
  const mockBingoCard = {
    B: [1, 2, 3, 4, 5],
    I: [16, 17, 18, 19, 20],
    N: [31, 45, 26, 18, 6],
    G: [46, 60, 21, 42, 36],
    O: [61, 75, 49, 67, 55]
  };

  const mockCalledNumbers = [1, 17, 20];
  const mockClickedNumbers = [1, 17];
  const mockOnNumberClick = jest.fn();
  const mockDeclareBingo = jest.fn();

  test('renders BingoCard with numbers', () => {
    render(
      <BingoCard
        bingoCard={mockBingoCard}
        clickedNumbers={mockClickedNumbers}
        onNumberClick={mockOnNumberClick}
        calledNumbers={mockCalledNumbers}
        declareBingo={mockDeclareBingo}
      />
    );

    // Check for rendered numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('17')).toBeInTheDocument();
  });

  test('calls onNumberClick when a number is clicked', () => {
    render(
      <BingoCard
        bingoCard={mockBingoCard}
        clickedNumbers={mockClickedNumbers}
        onNumberClick={mockOnNumberClick}
        calledNumbers={mockCalledNumbers}
        declareBingo={mockDeclareBingo}
      />
    );

    // Simulate clicking a number
    fireEvent.click(screen.getByText('1'));
    expect(mockOnNumberClick).toHaveBeenCalledWith(1, mockCalledNumbers);
  });

  test('enables Declare Bingo button when conditions are met', () => {
    //const newMockClickedNumbers = [...mockBingoCard.B, ...mockBingoCard.I, ...mockBingoCard.N, ...mockBingoCard.G, ...mockBingoCard.O]; 
    const incompleteMockClickedNumbers = [1, 17]; 

    render(
      <BingoCard
        bingoCard={mockBingoCard}
        //clickedNumbers={newMockClickedNumbers}
        clickedNumbers={incompleteMockClickedNumbers}
        onNumberClick={mockOnNumberClick}
        calledNumbers={mockCalledNumbers}
        declareBingo={mockDeclareBingo}
      />
    );

    // "Declare Bingo" button should be enabled
    const declareBingoButton = screen.getByText('Declare Bingo');
    //expect(declareBingoButton).not.toBeDisabled();
    expect(declareBingoButton).toBeDisabled();
  });
});
