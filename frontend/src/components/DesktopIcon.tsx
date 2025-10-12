import React from 'react';

interface DesktopIconProps {
    label: string;
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick }) => {
    return (
        <div 
            className="desktop-icon flex flex-col items-center gap-1 cursor-pointer w-20 text-center text-white p-2 hover:bg-navy" 
            onClick={onClick}
        >
            <div className="w-12 h-12">
                {React.cloneElement(icon, { className: 'w-full h-full' })}
            </div>
            <span>{label}</span>
        </div>
    );
};

export default DesktopIcon;