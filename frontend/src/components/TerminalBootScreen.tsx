
import React, { useState, useEffect } from 'react';

const bootMessages = [
    'Booting jennyOS v1.0.0...',
    'Copyright (c) 2025 Jennifer Nadolski. All rights reserved.',
    'Initializing kernel...',
    'Loading drivers...',
    'Mounting file systems...',
    'Starting services...',
    'Connecting to network...',
    'All systems go!',
    'Launching graphical user interface...',
];

const TerminalBootScreen: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < bootMessages.length) {
                setLines(prev => [...prev, bootMessages[index]]);
                index++;
            } else {
                clearInterval(timer);
            }
        }, 300);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black text-white font-mono p-4 overflow-y-auto">
            {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
            ))}
            {cursorVisible && <span className="bg-white w-2 h-4 inline-block"></span>}
        </div>
    );
};

export default TerminalBootScreen;
