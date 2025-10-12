import React from 'react';

interface StartMenuProps {
    onMenuItemClick: (id: string, title: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onMenuItemClick }) => {
    return (
        <div id="start-menu" className="absolute bottom-10 left-0 w-64 bg-silver border-2 border-white shadow-md z-[9999] p-1">
            <ul>
                <li onClick={() => onMenuItemClick('about', 'About Me')} className="flex items-center gap-2 p-2 hover:bg-navy hover:text-white cursor-pointer">
                    <span>About Me</span>
                </li>
                <li onClick={() => onMenuItemClick('projects', 'Projects')} className="flex items-center gap-2 p-2 hover:bg-navy hover:text-white cursor-pointer">
                    <span>Projects</span>
                </li>
                <li onClick={() => onMenuItemClick('contact', 'Contact')} className="flex items-center gap-2 p-2 hover:bg-navy hover:text-white cursor-pointer">
                    <span>Contact</span>
                </li>
                <li onClick={() => onMenuItemClick('jenai', 'JenAI')} className="flex items-center gap-2 p-2 hover:bg-navy hover:text-white cursor-pointer">
                    <span>JenAI</span>
                </li>
                <li onClick={() => onMenuItemClick('resume', 'Resume')} className="flex items-center gap-2 p-2 hover:bg-navy hover:text-white cursor-pointer">
                    <span>Resume</span>
                </li>
            </ul>
        </div>
    );
};

export default StartMenu;