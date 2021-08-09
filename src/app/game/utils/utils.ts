import { GAME_CONFIG } from "../config";

export class Event {
    listeners: Function[] = [];
    constructor() {
    }

    addListener(listener: Function) {
        this.listeners.push(listener);
    }

    trigger(params: any) {
        this.listeners.forEach(listener => {
            listener(params);
        });
    }
}

export function loadImage(url: string): Promise<any> {
    return new Promise (
        resolve => {
            const image = new Image();
            image.addEventListener('load', () => {
                resolve(image);
            });
            image.src = url;
        });
}

export function createCanvasContext(app: any, className: string): CanvasRenderingContext2D | null {
    const newCanvas: HTMLCanvasElement = document.createElement('canvas');

    newCanvas.width = GAME_CONFIG.canvas_size.width;
    newCanvas.height = GAME_CONFIG.canvas_size.height;
    newCanvas.className = className;

    app.appendChild(newCanvas);

    return newCanvas.getContext("2d");
}