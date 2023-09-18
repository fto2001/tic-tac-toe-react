import React from "react";

interface ModalProps {
    winner: string;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ winner, closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Congratulations!</h2>
                <p>The winner is {winner}!</p>
                <button className="modal-button" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

export default Modal;