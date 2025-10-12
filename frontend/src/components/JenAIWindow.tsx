import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
    text: string;
    isUser: boolean;
}

const JenAIWindow: React.FC = () => {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const [messages, setMessages] = useState<Message[]>([
        { text: "Greetings! I am JenAI. Ask me anything about Jennifer's portfolio. How can I assist you today?", isUser: false },
    ]);
    const [input, setInput] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { text: input, isUser: true };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');

        try {
            const response = await fetch(`${VITE_API_URL}/api/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botMessage: Message = { text: data.response, isUser: false };
            setMessages(prevMessages => [...prevMessages, botMessage]);

        } catch (error) {
            console.error('Error fetching from AI bot:', error);
            const errorMessage: Message = { text: 'Sorry, something went wrong.', isUser: false };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
    };

    return (
        <div className="flex flex-col h-full text-charcoal">
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center p-2 border-t-2 border-silver-light">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border-2 border-inset border-silver focus:outline-none"
                    placeholder="Type your message..."
                    autoComplete="off"
                />
                <button type="submit" className="btn-retro ml-2 px-4 py-2">Send</button>
            </form>
        </div>
    );
};

export default JenAIWindow;
