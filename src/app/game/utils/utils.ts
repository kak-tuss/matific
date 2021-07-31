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