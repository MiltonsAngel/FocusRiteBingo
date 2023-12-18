// BingoModal.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import BingoModal from '../components/BingoModal';

describe('BingoModal', () => {
  test('renders correctly when open', () => {
    const name = "John";
    render(<BingoModal isOpen={true} name={name} onClose={() => {}} />);

    expect(screen.getByText(`Congratulations ${name}!`)).toBeInTheDocument();
    expect(screen.getByText('Bingo!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(<BingoModal isOpen={false} name="John" onClose={() => {}} />);
    
    expect(screen.queryByText('Congratulations John!')).not.toBeInTheDocument();
  });

  test('displays the correct name', () => {
    const name = "Alice";
    render(<BingoModal isOpen={true} name={name} onClose={() => {}} />);

    expect(screen.getByText(`Congratulations ${name}!`)).toBeInTheDocument();
  });

  test('close button triggers onClose', () => {
    const onClose = jest.fn();
    render(<BingoModal isOpen={true} name="Alice" onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
