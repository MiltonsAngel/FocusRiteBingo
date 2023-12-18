import React from 'react';
import '../css/notification.css'; 

const Notification = ({ message, type }) => {
    // Determine the styles and icon based on the type
    const styles = {
        backgroundColor: type === 'success' ? 'green' : 'red',
        color: 'white',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '5px',
        margin: '10px 0',
    };

    const icon = type === 'success' ? '✔️' : '❌';

    if (!message) return null; 

    return (
        <div style={styles}>
            <span>{icon}</span>
            <span>{message}</span>
        </div>
    );
};

export default Notification;
