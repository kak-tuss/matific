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
