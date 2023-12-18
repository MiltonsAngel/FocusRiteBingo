import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import PlayerList from '../components/PlayerList';

describe('PlayerList Component', () => {
    const mockPlayers = [
        { id: '1', name: 'Alice', Email: 'alice@hotmail.com' },
        { id: '2', name: 'Bob', Email: 'bob@hotmail.com' }
    ];

    const mockOnLeaveGame = jest.fn();

    it('renders correctly', () => {
        render(<PlayerList players={mockPlayers} onLeaveGame={mockOnLeaveGame} />);
        expect(screen.getByText('Players')).toBeInTheDocument();
    });

    it('displays all players with leave buttons', () => {
        render(<PlayerList players={mockPlayers} onLeaveGame={mockOnLeaveGame} />);
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getAllByText('Leave Game')).toHaveLength(2);
    });

    it('calls onLeaveGame when a leave button is clicked', () => {
        render(<PlayerList players={mockPlayers} onLeaveGame={mockOnLeaveGame} />);
        fireEvent.click(screen.getAllByText('Leave Game')[0]);
        expect(mockOnLeaveGame).toHaveBeenCalledWith('1');
    });

    it('displays a message when a player leaves', () => {
        render(<PlayerList players={mockPlayers} onLeaveGame={mockOnLeaveGame} />);
        fireEvent.click(screen.getAllByText('Leave Game')[0]);
        expect(screen.getByText('Alice has left the game')).toBeInTheDocument();
    });

    it('displays no player data available when no players are present', () => {
        render(<PlayerList players={[]} onLeaveGame={mockOnLeaveGame} />);
        expect(screen.getByText('No player data available.')).toBeInTheDocument();
    });
});
