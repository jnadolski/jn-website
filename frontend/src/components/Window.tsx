import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
    onClose: () => void;
    onFocus: () => void;
    onDrag: (position: { x: number; y: number }) => void;
}

const Window: React.FC<WindowProps> = ({ id, title, children, isOpen, position, size, zIndex, onClose, onFocus, onDrag }) => {
    const [isDragging, setIsDragging] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (windowRef.current) {
            setIsDragging(true);
            onFocus();
            dragStartPos.current = {
                x: e.clientX - windowRef.current.offsetLeft,
                y: e.clientY - windowRef.current.offsetTop,
            };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && windowRef.current) {
            const newX = e.clientX - dragStartPos.current.x;
            const newY = e.clientY - dragStartPos.current.y;
            onDrag({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={windowRef}
            className="window min-w-[300px] min-h-[200px] absolute border-2 border-white shadow-md bg-silver flex flex-col resize overflow-auto"
            style={{ top: `${position.y}px`, left: `${position.x}px`, zIndex, width: `${size.width}px`, height: `${size.height}px` }}
            onMouseDown={onFocus}
        >
            <div
                className="title-bar bg-navy text-white p-1 font-bold flex justify-between items-center cursor-grab h-[30px]"
                onMouseDown={handleMouseDown}
            >
                <span>{title}</span>
                <div className="title-bar-controls flex gap-1">
                    <button
                        className="w-5 h-5 bg-silver border border-white border-r-black border-b-black shadow-inner-black font-bold flex items-center justify-center leading-none pb-0.5"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
            </div>
            <div className="window-body p-4 flex-grow bg-paper m-1 border border-black shadow-inner-grey overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default Window;