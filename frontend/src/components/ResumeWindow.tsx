import React from 'react';
import printIcon from '../assets/print.svg';

const ResumeWindow: React.FC = () => {
    const resumeUrl = '/resume.pdf';

    const handlePrint = () => {
        window.open(resumeUrl, '_blank');
    };

    return (
        <div className="h-full flex flex-col bg-silver-light">
            <div className="p-2 flex justify-end border-b-2 border-silver-light bg-silver">
                <button onClick={handlePrint} className="btn-retro px-4 py-2 flex items-center gap-2">
                    <img src={printIcon} alt="Print" className="w-5 h-5" />
                    <span>Print</span>
                </button>
            </div>
            <div className="flex-grow p-8 overflow-y-auto bg-paper shadow-lg m-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Jennifer Nadolski</h1>
                    <p>(480) 570-7617 • nadolskj@gmail.com • jennifernadolski.com • Gilbert, AZ</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold border-b-2 border-charcoal pb-1 mb-2">Professional Summary</h2>
                    <p>AI-focused Systems & Software Engineer with 3+ years of experience developing reliable, large-scale systems and integrating LLM-based solutions into production environments. Skilled in C++ and systems design, with hands-on experience using Python, cloud platforms, and Gemini API integrations to prototype and deploy AI-powered applications. Passionate about building intelligent, high-quality software that bridges cutting-edge AI innovation with production-grade reliability.</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold border-b-2 border-charcoal pb-1 mb-2">Professional Experience</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold">Software Engineer</h3>
                        <p className="italic">Microsoft Corporation • Redmond, WA | May 2020 - Mar. 2024</p>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                            <li>Led end-to-end feature development for a high-profile Windows 11 Taskbar component, leveraging C++ and Windows APIs to deliver a critical update with 99.9%+ reliability to over one billion users.</li>
                            <li>Contributed to system integration for the Windows Copilot experience, collaborating cross-functionally to define requirements and ensure seamless OS-level performance.</li>
                            <li>Improved performance and maintainability of legacy codebases through deep debugging, systems analysis, and design reviews, enhancing large-scale reliability.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Systems Engineering Intern</h3>
                        <p className="italic">General Dynamics Mission Systems • Scottsdale, AZ | May 2019 - Aug. 2019</p>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                            <li>Authored a trade study for a US Navy satellite ground station, defining hardware replacement strategies and presenting recommendations to engineering and government stakeholders.</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold border-b-2 border-charcoal pb-1 mb-2">Projects</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold">LLM-Driven File Automation Agent</h3>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                            <li>Built a cross-platform automation agent integrating the Gemini API and custom prompt engineering to intelligently organize and label files using Python/PyQt6.</li>
                            <li>Designed a CI/CD pipeline in GitHub Actions for reliable, multi-OS deployment and consistent LLM integration.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Full-Stack Portfolio Website</h3>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                            <li>Developed a React/TypeScript and Node/Express application showcasing AI and systems projects, with automated cloud deployment and build workflows.</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold border-b-2 border-charcoal pb-1 mb-2">Education</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold">M.S. Electrical & Computer Engineering</h3>
                        <p className="italic">The University of Arizona • Expected: May 2026</p>
                        <p>Focus in AI Systems Architecture. Key coursework: Web Development & Internet of Things, Principles of Artificial Intelligence, Systems Engineering Process, Technical Sales & Marketing.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">B.S. Electrical & Computer Engineering</h3>
                        <p className="italic">The University of Arizona • Graduated Magna Cum Laude</p>
                        <p>Lead Undergraduate Lab Assistant: Built foundational C/C++ expertise by providing hands-on debugging support and guidance to 150+ students.</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold border-b-2 border-charcoal pb-1 mb-2">Skills</h2>
                    <p><strong>Core Strengths:</strong> C++, Systems Design, Debugging Complex Codebases, Reliability Engineering</p>
                    <p><strong>AI & Integration:</strong> LLM-Based Application Design, Prompt Engineering, Applied AI Prototyping, Intelligent Automation</p>
                    <p><strong>Programming & Tools:</strong> Python, JavaScript, React, Node.js, SQL/NoSQL, CI/CD, GitHub Actions</p>
                    <p><strong>Systems & Cloud:</strong> Windows APIs, Linux/Unix, Cloud Services (Azure, GCP basics), API Design, Systems Architecture</p>
                </div>
            </div>
        </div>
    );
};

export default ResumeWindow;
