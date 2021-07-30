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