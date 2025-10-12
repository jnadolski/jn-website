import React from 'react';

const ContactWindow: React.FC = () => {
    return (
        <div className="window-body text-lg">
            <h2 className="text-2xl font-bold mb-4">Get In Touch!</h2>
            <p className="mb-3">
                <strong>Email:</strong> <a href="mailto:nadolskj@gmail.com">nadolskj@gmail.com</a>
            </p>
            <p className="mb-3">
                <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/jennifer-nadolski" target="_blank">linkedin.com/in/jennifer-nadolski</a>
            </p>
            <p className="mb-3">
                <strong>GitHub:</strong> <a href="https://github.com/jnadolski" target="_blank">github.com/jnadolski</a>
            </p>
        </div>
    );
};

export default ContactWindow;