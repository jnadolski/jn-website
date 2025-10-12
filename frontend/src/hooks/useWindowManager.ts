
import { useState, useEffect } from 'react';
import type { WindowState } from '../types';

export const useWindowManager = () => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [highestZIndex, setHighestZIndex] = useState(100);
    const [windowOffset, setWindowOffset] = useState(0);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

    useEffect(() => {
        const allClosed = windows.every(w => !w.isOpen);
        if (allClosed) {
            setWindowOffset(0);
            setActiveWindowId(null);
        }
    }, [windows]);

    const openWindow = (id: string, title: string, size = { width: 600, height: 400 }) => {
        setWindows(prevWindows => {
            const existingWindow = prevWindows.find(w => w.id.startsWith(id));
            if (existingWindow) {
                bringToFront(existingWindow.id);
                return prevWindows.map(w => w.id.startsWith(id) ? { ...w, isOpen: true } : w);
            }

            const newPosition = { x: 150 + windowOffset * 20, y: 50 + windowOffset * 20 };
            setWindowOffset(windowOffset + 1);

            const newWindowId = `${id}-${Date.now()}`;
            const newWindow: WindowState = {
                id: newWindowId,
                title,
                isOpen: true,
                position: newPosition,
                size,
                zIndex: highestZIndex + 1,
            };
            setHighestZIndex(highestZIndex + 1);
            setActiveWindowId(newWindowId);
            return [...prevWindows, newWindow];
        });
    };

    const closeWindow = (id: string) => {
        setWindows(prevWindows => prevWindows.map(w => w.id === id ? { ...w, isOpen: false } : w));
    };

    const bringToFront = (id: string) => {
        setActiveWindowId(id);
        setWindows(prevWindows => {
            const windowToFront = prevWindows.find(w => w.id === id);
            if (!windowToFront || windowToFront.zIndex === highestZIndex) {
                return prevWindows;
            }
            const newZIndex = highestZIndex + 1;
            setHighestZIndex(newZIndex);
            return prevWindows.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w);
        });
    };

    const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
        setWindows(prevWindows => prevWindows.map(w => w.id === id ? { ...w, position } : w));
    };

    const updateWindowSize = (id: string, size: { width: number; height: number }) => {
        setWindows(prevWindows => prevWindows.map(w => w.id === id ? { ...w, size } : w));
    };

    return {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        bringToFront,
        updateWindowPosition,
        updateWindowSize,
    };
};
