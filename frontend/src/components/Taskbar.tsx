import React, { useState, useEffect, useRef } from 'react';
import StartButton from './StartButton';
import Clock from './Clock';
import StartMenu from './StartMenu';
import TaskbarItem from './TaskbarItem';
import type { WindowState } from '../types';

interface TaskbarProps {
    windows: WindowState[];
    activeWindowId: string | null;
    onStartMenuItemClick: (id: string, title: string) => void;
    onTaskbarItemClick: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, activeWindowId, onStartMenuItemClick, onTaskbarItemClick }) => {
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const startMenuRef = useRef<HTMLDivElement>(null);

    const handleStartButtonClick = () => {
        setIsStartMenuOpen(!isStartMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
            setIsStartMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isStartMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isStartMenuOpen]);

    return (
        <div id="taskbar" className="absolute bottom-0 left-0 w-full h-10 bg-silver border-t-2 border-white flex items-center px-1 z-[10000]">
            <div ref={startMenuRef}>
                <div onClick={handleStartButtonClick}>
                    <StartButton />
                </div>
                {isStartMenuOpen && <StartMenu onMenuItemClick={onStartMenuItemClick} />}
            </div>
            <div className="flex gap-1 ml-2">
                {windows.filter(w => w.isOpen).map(window => (
                    <TaskbarItem
                        key={window.id}
                        title={window.title}
                        isActive={window.id === activeWindowId}
                        onClick={() => onTaskbarItemClick(window.id)}
                    />
                ))}
            </div>
            <Clock />
        </div>
    );
};

export default Taskbar;