
export interface WindowState {
    id: string;
    title: string;
    isOpen: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
}
