import React from 'react';

interface TaskbarItemProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

const TaskbarItem: React.FC<TaskbarItemProps> = ({ title, isActive, onClick }) => {
    const activeClass = isActive 
        ? 'border-t-black border-l-black border-r-white border-b-white shadow-inner-white bg-silver-light' 
        : 'btn-retro';

    return (
        <button className={`taskbar-item px-3 py-1 min-w-[150px] ${activeClass}`} onClick={onClick}>
            {title}
        </button>
    );
};

export default TaskbarItem;