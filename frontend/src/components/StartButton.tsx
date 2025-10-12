import React from 'react';

const StartButton: React.FC = () => {
    return (
        <button id="start-button" className="btn-retro flex items-center gap-1 px-2 py-1 text-lg text-navy">
            <span>Start</span>
        </button>
    );
};

export default StartButton;