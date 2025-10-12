import React from 'react';
import headshot from '../assets/me.jpeg';

const AboutWindow: React.FC = () => {
    return (
        <div className="flex gap-4 text-charcoal">
            <img src={headshot} alt="Jennifer Nadolski" className="w-32 h-32" />
            <div>
                <h1 className="text-2xl font-bold mb-2">Jennifer Nadolski</h1>
                <p className="mb-2"><strong>LOCATION:</strong> Phoenix, AZ</p>
                <p>I am an AI-focused Systems and Software Engineer who builds reliable, large-scale systems. With over three years of experience, I specialize in bridging cutting-edge AI innovation with the rigorous demands of production-grade software. My core expertise is in C++ and systems design, complemented by hands-on experience integrating LLM solutions into production environments.</p>
                <p className="mt-2">At Microsoft, I led the development of a core Windows 11 feature, delivering it with 99.9%+ reliability to over one billion users. I also played a key role in the system integration for the Windows Copilot experience. My work is defined by enhancing performance and maintainability in complex, large-scale codebases to deliver tangible results.</p>
            </div>
        </div>
    );
};

export default AboutWindow;