// BingoModal.js
import React from 'react';
import Modal from 'react-modal';
import '../css/BingoModal.css'; 

const BingoModal = ({ isOpen, onClose, name }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} className="bingo-modal">
            <div className="modal-content">
                <h2 className="congratulations">Congratulations {name}!</h2>
                <div className="bingo-circle">Bingo!</div>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
};

export default BingoModal;
