import React from 'react';

interface ChatMessageProps {
    message: {
        text: string;
        isUser: boolean;
    };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const messageClass = message.isUser
        ? 'bg-navy text-white self-end'
        : 'bg-silver-light self-start';

    return (
        <div className={`rounded-lg p-2 max-w-[80%] ${messageClass}`}>
            <p>{message.text}</p>
        </div>
    );
};

export default ChatMessage;