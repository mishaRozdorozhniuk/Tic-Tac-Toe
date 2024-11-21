import React from 'react';

const Modal = () => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Game Over</h2>
                <p>Thank you for playing!</p>
                <button onClick={() => window.location.reload()}>Play Again</button>
            </div>
        </div>
    );
};

export default Modal;