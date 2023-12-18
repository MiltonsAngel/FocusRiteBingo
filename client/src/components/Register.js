// Register.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/modal.css';
import { v4 as uuidv4 } from 'uuid';
import Notification from './notification';
import cookie from '../utils/cookie';

const Register = ({ isOpen, onClose, onAddPlayer }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Example function to trigger a success notification
    const handleSuccessAction = (msg) => {
        setNotification({ message: msg, type: 'success' });
        // Reset notification after a delay
        setTimeout(() => setNotification({ message: '', type: '' }), 7000);
    };

    // Example function to trigger a failure notification
    const handleFailureAction = (msg) => {
        setNotification({ message: msg, type: 'failure' });
        // Reset notification after a delay
        setTimeout(() => setNotification({ message: '', type: '' }), 7000);
    };

    const registerPlayer = () => {
        if (!name || !email) {
            handleFailureAction("Please enter both name and email!");
            return;
        }
        
        const formattedName = name.replace(/ /g, '_');
        const encodedEmail = encodeURIComponent(email);

        let existingPlayer =  cookie.getCookie(formattedName + "_cookie"); 

        if (existingPlayer !== null && existingPlayer === encodedEmail) {
            handleFailureAction("This email is already registered!");
            setName('');
            setEmail('');
            return;
        }

        // Generate a UUID for the new player
        const uniqueId = uuidv4();

        const newPlayer = { id: uniqueId, name, email };

        
        // Set a cookie to expire in 12 hours
        cookie.setCookieWith12HourExpiry(formattedName + "_cookie", encodedEmail);

        const existingPlayers = JSON.parse(localStorage.getItem('players')) || [];
        existingPlayers.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(existingPlayers));

        handleSuccessAction("Registered successfully!");
        setName('');
        setEmail('');

        //return new palyer
        onAddPlayer(newPlayer);
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} ariaHideApp={false}>
            <div className="modal-backdrop">
                <div className="modal-content">
                    <h2>Register to Play</h2>
                    <div><Notification message={notification.message} type={notification.type} /></div>
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <div>
                            <span><button onClick={registerPlayer}>Register</button></span>
                            <span> <button onClick={onClose}>Close</button></span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Register;
