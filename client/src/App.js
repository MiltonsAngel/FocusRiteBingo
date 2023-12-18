// App.js
import React from 'react';
import { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import BingoCard from './components/BingoCard';
import PlayerList from './components/PlayerList';
import ChatBox from './components/ChatBox';
import NumberDisplay from './components/NumberDisplay';
import './App.css';
import socketService from './utils/socket';
import gameService from './services/gameService'
import winnerService from './services/winnerService'
import Register from '../src/components/Register';
import BingoModal from '../src/components/BingoModal';
import cookie from './utils/cookie';
import GameStatus from './components/GameStatus.js';


const App = () => {

    //  Game setup states
    const [bingoCard, setBingoCard] = useState({});
    const [calledNumbers, setCalledNumbers] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [startResult, setStartResult] = useState([]);
    const [showRegister, setShowRegister] = useState(false);
    const [clickedNumbers, setClickedNumbers] = useState([]);

    //  Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bingoModalIsOpen, setBingoModalIsOpen] = useState(false);
    const [newGameMsg, setNewGameMsg] = useState('');

    //  Player states
    const [players, setCurrentPlayers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState([]);

    //  MongoDb database states
    const [startPlayerResult, setStartPlayerResult] = useState([]);
    const [updateResult, setUpdateResult] = useState([]);
    const [updateGame, setUpdateGame] = useState(0);

    const [userCanDeclareBingo, setUserCanDeclareBingo] = useState(false);



    useEffect(() => {
        // Connect to server
        socketService.connect();

        //  Check if cookie is available
        //cookie.getCookie();
        getPlayers().then(players => {
            setCurrentPlayers(players || []);
        }).catch(error => {
            console.error('Error loading players:', error);
        });

        // generateBingoCard
        generateBingoCard();

       


        // return () => {
        //     socketService.disconnect();
        // };
    }, []);

    useEffect(() => {
        console.log(players);
        const player = players.find(p => p.name === 'Field Du Boulay');
        setCurrentPlayer(player);

        console.log("Loading players");
        console.log(players);

    }, [players]);

    const addPlayer = (newPlayer) => {
        setCurrentPlayers(currentPlayers => [...currentPlayers, newPlayer]);
    };

    const generateBingoCard = () => {
        gameService.generateBingoCard()
            .then(card => {
                setBingoCard(card);
            })
            .catch(error => console.error('Error:', error));
    };

    // const handleClick = (selectedNumber) => {
    //     if (selectedNumber !== 'FREE' && isNumberCalled(selectedNumber)) {
    //         setClickedNumbers(prevClickedNumbers => {
    //             if (!prevClickedNumbers.includes(selectedNumber)) {
    //                  return [...prevClickedNumbers, selectedNumber];
    //              }
    //             return prevClickedNumbers;
    //         });
    //      }
    //  };

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


    const handleRegisterClick = () => {
        setShowRegister(true);
        setIsModalOpen(true);
    };

    const getPlayers = async () => {

        // Check if user data exists in local storage
        const userData = localStorage.getItem('players');

        if (userData) {
            try {
                // Parse the user data from JSON string to an object
                return JSON.parse(userData);
            } catch (error) {
                console.error('Error parsing user data from local storage', error);
            }
        }

        // Return null if no user data is found
        return null;
    }

    const startGame = async () => {
        const currentPlayers = await getPlayers();

        if (currentPlayers) {
            console.log('The current game has: ' + currentPlayers.length + ' Players registered');
        } else {
            console.log('No user is currently logged in');
        }

        const numbersCalled = [];
        const initialNumber = await callNumber(); // Get the initial number generated and add to numbersCalled array
        numbersCalled.push(initialNumber);

        //  Call the game service to start the game
        const result = await gameService.startGame(GameStatus.STARTED, currentPlayers, numbersCalled);
        setStartResult(result);
        console.log("start result ", result);

        if (result.insertedId) {
            //  Set game started
            setGameStarted(true);
            //  Set the initial number called
            setCalledNumbers(prevNumbers => [...prevNumbers, initialNumber]);
        }
        else {
            alert("Game did not start properly");
        }
    };


    const handleJoinGame = (gameId, playerId) => {
        socketService.joinGame(gameId, playerId);
    };

    //const handleLeaveGame = (gameId, playerId) => {
    //    socketService.leaveGame(gameId, playerId);
    // };

    const handleSendMessage = (gameId, message) => {
        socketService.sendChatMessage(gameId, message);
    };


    const callNextNumber = async () => {
        if (calledNumbers.length < 75) {
            const nextNumber = await callNumber();
            setCalledNumbers(prevNumbers => [...prevNumbers, nextNumber]);
            setUpdateGame(prevUpdate => [prevUpdate + 1]);
        }
        else if (calledNumbers.length === 75) {
            gameService.updateGame(startResult.insertedId, GameStatus.FINISHED, calledNumbers);
            setGameStarted(false);
            alert("No more numbers left to draw");
        }
    };

    useEffect(() => {
        if (gameStarted && calledNumbers.length > 0 && startResult && startResult.insertedId) {
            const updateGameAsync = async () => {
                try {
                    const updateResult = await gameService.updateGame(startResult.insertedId, GameStatus.IN_PROGRESS, calledNumbers);
                    setUpdateResult(updateResult);
                    console.log("Update result", updateResult);
                } catch (error) {
                    console.error('Error updating game:', error);
                }
            };

            updateGameAsync();
            console.log('updated numbers ' + calledNumbers);
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


    //  Add a message to the message list
    const addMessage = (newMessageText) => {
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
    };

    //  Player declares bingo.
    const declareBingo = (canDeclareBingo, winningNumbers) => {
        if (canDeclareBingo) {
            setUserCanDeclareBingo(canDeclareBingo);
            //  Open modal to display message to the winner
            setBingoModalIsOpen(true)
            console.log("Bingo declared!");
            //  Set game finished
            const updateResult = gameService.updateGame(startResult.insertedId, GameStatus.FINISHED, calledNumbers);
            console.log("Finishing game ", updateResult);
            //  Update record details of the player who won.
            const winnerResult = winnerService.registerWinner(startResult.insertedId, currentPlayer, winningNumbers);
            setStartPlayerResult(winnerResult);
            console.log("Register winner result ", winnerResult);
            //`Clear called numbers
            setCalledNumbers([]);
            //  Clear clicked numbers
            setClickedNumbers([]);
            //  Set newgame msg
            setNewGameMsg('A new game will start soon');

            //  Generate new bingo card
            generateBingoCard();
            gameService.resetNumbers();

            //  enable start button
            setGameStarted(false);
        }
    };

    const handleLeaveGame = (playerId) => {
        // Remove player from players list
        const leavingPlayer = players.find(p => p.id === playerId);
        removePlayerById(playerId);
        console.log(`${leavingPlayer.name} is leaving the game.`);
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

    return (
        <div className="app">
            <div className="game-board-column">
                <GameBoard calledNumbers={calledNumbers} />
            </div>

            <div className="game-play-column">
                <NumberDisplay currentNumber={calledNumbers.length === 0 ? 'waiting...' : calledNumbers[calledNumbers.length - 1]} newGameMsg={newGameMsg} />
                <BingoCard bingoCard={bingoCard} clickedNumbers={clickedNumbers} onNumberClick={handleClick} calledNumbers={calledNumbers} declareBingo={declareBingo} />
                <div className="controls">
                    <button onClick={startGame} disabled={players.length === 4}>Start Game</button>
                    <button onClick={callNextNumber} disabled={!gameStarted}>Call Next Number</button>
                </div>
            </div>

            <div className="sidebar">
                {showRegister &&
                    <Register onAddPlayer={addPlayer} isOpen={isModalOpen} onClose={() => setShowRegister(false)} />}
                <PlayerList players={players} onLeaveGame={handleLeaveGame} />
                <button style={{ cursor: 'pointer' }} onClick={handleRegisterClick} disabled={players.length === 4}>Join Game</button>
                <ChatBox currentPlayer={currentPlayer} messages={messages} sendMessage={addMessage} />
            </div>

            <BingoModal isOpen={bingoModalIsOpen} onClose={() => setBingoModalIsOpen(false)} name={currentPlayer !== undefined ? currentPlayer.name : []} />
        </div>
    );
};

export default App;
