// App.js
import React from 'react';
import { useEffect, useState } from 'react';

//  Components
import GameBoard from './components/GameBoard';
import BingoCard from './components/BingoCard';
import PlayerList from './components/PlayerList';
import ChatBox from './components/ChatBox';
import NumberDisplay from './components/NumberDisplay';
import Register from './components/Register';
import BingoModal from './components/BingoModal';
import GameStatus from './components/GameStatus.js';

//  Styles
import './App.css';

//  Services
import socketService from './utils/socket';
import gameService from './services/gameService'
import winnerService from './services/winnerService'
//import playerService from './services/playerService';
import cookie from './utils/cookie';





const App = () => {
    //  Game setup states
    const [bingoCard, setBingoCard] = useState({});
    const [calledNumbers, setCalledNumbers] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [startResult, setStartResult] = useState([]);
    const [showRegister, setShowRegister] = useState(false);
    const [clickedNumbers, setClickedNumbers] = useState([]);
    const [newGame, setNewGame] = useState(false);

    //  Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bingoModalIsOpen, setBingoModalIsOpen] = useState(false);
    const [newGameMsg, setNewGameMsg] = useState('');

    //  Player states
    const [players, setCurrentPlayers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState([]);

    //  MongoDb database states
    const [winningPlayerResult, setWinningPlayerResult] = useState([]);
    const [joinGameResult, setJoinGameResult] = useState([]);
    const [updateResult, setUpdateResult] = useState([]);
    const [playerResult, setPlayerResult] = useState([]);
    const [updateGame, setUpdateGame] = useState(0);

    const [userCanDeclareBingo, setUserCanDeclareBingo] = useState(false);


    useEffect(() => {

        // Connect to server
        socketService.connect();

        //  Delete any existing player cookies
        cookie.deleteCookiesEndingWith('_cookie');

        // generateBingoCard
        generateBingoCard();

        // return () => {
        //     socketService.disconnect();
        // };
    }, []);


    //  Generate a new Bingo card
    const generateBingoCard = () => {
        gameService.generateBingoCard()
            .then(card => {
                setBingoCard(card);
            })
            .catch(error => console.error('Error:', error));
    };


    //Create a new game in MongoDB
    const GenerateNewGame = async () => {
        //  Generate a new game
        const addPlayer = players.length > 0 ? players : [];
        const result = await gameService.startGame(GameStatus.WAITING, addPlayer, []);
        setStartResult(result);
        //  Reset the numbers
        gameService.resetNumbers();
        //`Clear called numbers
        setCalledNumbers([]);
        //  Clear clicked numbers
        setClickedNumbers([]);
        setNewGame(true);
        setNewGameMsg("New game generated!");
    };



    //  TEMP: - For testing purposes
    // useEffect(() => {
    //     const player = players.find(p => p.name === 'Field Du Boulay');
    //     setCurrentPlayer(player);
    // }, [players, startResult]);


    //  A new player joined the game
    const addPlayer = (newPlayer) => {
        handleJoinGame(startResult.insertedId, newPlayer);
        setCurrentPlayers(currentPlayers => [...currentPlayers, newPlayer]);
        setCurrentPlayer(newPlayer);
    };

    //  Adds users clicked number from their bingo card
    const handleClick = (selectedNumber, calledNumbers) => {
        if (selectedNumber !== 'FREE' && calledNumbers.includes(selectedNumber)) {
            setClickedNumbers(prevClickedNumbers => {
                if (!prevClickedNumbers.includes(selectedNumber)) {
                    return [...prevClickedNumbers, selectedNumber];
                }
                return prevClickedNumbers;
            });
        }
    };

    //  When a user clicks the register button to join a game
    const handleRegisterClick = () => {
        setShowRegister(true);
        setIsModalOpen(true);
    };

    //  Starts a game
    const startGame = async () => {

        const numbersCalled = [];
        const initialNumber = await callNumber(); // Get the initial number generated and add to numbersCalled array
        numbersCalled.push(initialNumber);

        //  Call the game service to start the game
        const updateResult = await gameService.updateGame(startResult.insertedId, GameStatus.IN_PROGRESS, numbersCalled);
        setUpdateResult(updateResult);
        console.log("update result ", updateResult);
        setGameStarted(true);
        //  Set the initial number called
        setCalledNumbers(prevNumbers => [...prevNumbers, initialNumber]);

        socketService.startGame(startResult.insertedId);

        //  Broadcast event to room
        socketService.on('gameStarted', (message) => {
            setNewGameMsg(message);
        });

        return () => {
            socketService.off('gameStarted');
        }

    };


    const handleJoinGame = async (gameId, newPlayer) => {
        //  Add the new user to players list in game
        const joinGameResult = await gameService.joinGame(startResult.insertedId, newPlayer);
        setJoinGameResult(joinGameResult);
        socketService.joinGame(gameId, newPlayer);

        //  Broadcast event to room
        socketService.on('playerJoined', (message) => {
            setNewGameMsg(message);
        });

        return () => {
            socketService.off('playerJoined');
        }
    };


    const handleLeaveGame = async (playerId) => {
        // Remove player from players list
        const leavingPlayer = players.find(p => p.id === playerId);
        removePlayerById(playerId);
        const gameId = startResult.insertedId;
        socketService.leaveGame(gameId, leavingPlayer);

        //  Broadcast event to room
        socketService.on('playerLeft', (message) => {
            setNewGameMsg(message);
        });

        return () => {
            socketService.off('playerLeft');
        }
    };

    const removePlayerById = (playerId) => {
        // Retrieve the players array from Local Storage
        const localStoragePlayersList = JSON.parse(localStorage.getItem('players')) || [];

        // Filter out the player with the specified id
        const updatedPlayers = localStoragePlayersList.filter(player => player.id !== playerId);

        //  check if any players are still in the game.
        // Save the updated players array back to Local Storage
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
        setCurrentPlayers(players.filter(player => player.id !== playerId));
    };

    const handleSendMessage = (newMessageText) => {
        if (currentPlayer !== undefined) {
            const newMessage = {
                sender: currentPlayer.name,
                text: newMessageText
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
        }
        else {
            alert("Unable to send messages.  You must first register to join this game");
        }

        socketService.sendChatMessage(startResult.insertedId, currentPlayer, newMessageText);

        //  Broadcast event to room
        socketService.on('chatMessage', (message) => {
            setNewGameMsg(message);
        });

        return () => {
            socketService.off('chatMessage');
        }
    };


    const callNextNumber = async () => {
        if (calledNumbers.length < 75) {
            const nextNumber = await callNumber();
            setCalledNumbers(prevNumbers => [...prevNumbers, nextNumber]);
            setUpdateGame(prevUpdate => [prevUpdate + 1]);

            socketService.numberCalled(startResult.insertedId, nextNumber);

            //  Broadcast event to room
            socketService.on('callNumber', (message) => {
                setNewGameMsg(message);
            });

            return () => {
                socketService.off('callNumber');
            }
        }
        else if (calledNumbers.length === 75) {
            gameService.updateGame(startResult.insertedId, GameStatus.FINISHED, calledNumbers);
            setGameStarted(false);
            setNewGame(false);
            alert("No more numbers left to draw");
        }
    };

    useEffect(() => {
        if (gameStarted && calledNumbers.length > 0 && startResult && startResult.insertedId) {
            const updateGameAsync = async () => {
                try {
                    const updateResult = await gameService.updateGame(startResult.insertedId, GameStatus.IN_PROGRESS, calledNumbers);
                    setUpdateResult(updateResult);
                } catch (error) {
                    console.error('Error updating game:', error);
                }
            };

            updateGameAsync();
        }
    }, [updateGame]);


    const callNumber = async () => {
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            try {
                const number = await gameService.generateNumber();
                return number;
            } catch (error) {
                console.error('Error fetching number:', error);
                attempts++;
                if (attempts >= maxAttempts) {
                    console.error('Max attempts reached. Unable to fetch number.');
                    return null;
                }
            }
        }
    };


    //  Player declares bingo.
    const declareBingo = (canDeclareBingo, winningNumbers) => {
        if (canDeclareBingo) {
            setUserCanDeclareBingo(canDeclareBingo);
            //  Open modal to display message to the winner
            setBingoModalIsOpen(true)
            //  Set game finished
            const updateResult = gameService.updateGame(startResult.insertedId, GameStatus.FINISHED, calledNumbers);
            setUpdateResult(updateResult);

            //  Update record details of the player who won.
            const winnerResult = winnerService.registerWinner(startResult.insertedId, currentPlayer, winningNumbers);
            setWinningPlayerResult(winnerResult);

            //`Clear called numbers
            setCalledNumbers([]);
            //  Clear clicked numbers
            setClickedNumbers([]);
            //  clear messages
            setMessages([]);

            //  Generate new bingo card
            generateBingoCard();
            //  Reset the numbers
            gameService.resetNumbers();
            //  enable start and new game buttons
            setGameStarted(false);
            setNewGame(false);

            //  Broadcast event to room
            socketService.declareBingo(startResult.insertedId, currentPlayer);
            socketService.on('declareBingo', (message) => {
                setNewGameMsg(message);
            });

            return () => {
                socketService.off('declareBingo');
            }
        }
    };

    //  Display broadcast message to room for 4 seconds
    useEffect(() => {
        if (newGameMsg !== null) {
            // Clear the message after delay
            setTimeout(() => {
                setNewGameMsg('');
            }, 5000);

        }
    }, [newGameMsg]);



    return (
        <div className="app">
            <div className="game-board-column">
                <GameBoard calledNumbers={calledNumbers} />
            </div>

            <div className="game-play-column">
                <NumberDisplay currentNumber={calledNumbers.length === 0 ? 'waiting...' : calledNumbers[calledNumbers.length - 1]} />
                <div style={{ height: 50 }}>
                    {newGameMsg}
                </div>
                <BingoCard bingoCard={bingoCard} clickedNumbers={clickedNumbers} onNumberClick={handleClick} calledNumbers={calledNumbers} declareBingo={declareBingo} />
                <div className="controls">
                    <button onClick={GenerateNewGame} disabled={newGame}>New Game</button>&nbsp;&nbsp;
                    <button onClick={startGame} disabled={!newGame || gameStarted || players.length === 0}>Start Game</button>&nbsp;&nbsp;
                    <button onClick={callNextNumber} disabled={!gameStarted || clickedNumbers.length === 24}>Call Next Number</button>
                </div>
            </div>

            <div className="sidebar">
                {showRegister &&
                    <Register onAddPlayer={addPlayer} isOpen={isModalOpen} onClose={() => setShowRegister(false)} />}
                <PlayerList players={players} onLeaveGame={handleLeaveGame} />
                <button style={{ cursor: 'pointer' }} onClick={handleRegisterClick} disabled={!newGame || gameStarted}>Join Game</button>
                <ChatBox currentPlayer={currentPlayer} messages={messages} sendMessage={handleSendMessage} isGameStarted={!gameStarted} />
            </div>

            <BingoModal isOpen={bingoModalIsOpen} onClose={() => setBingoModalIsOpen(false)} name={currentPlayer !== undefined ? currentPlayer.name : []} />
        </div>
    );
};

export default App;
