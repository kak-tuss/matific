import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts";
import { BoatModel } from "./entities/boat/boatModel";
import { BoatView } from "./entities/boat/boatView";
import { ParachutistModel } from "./entities/parachutist/parachutistModel";
import { ParachutistView } from "./entities/parachutist/parachutistView";
import { PlaneModel } from "./entities/plane/planeModel";
import { PlaneView } from "./entities/plane/planeView";
import { SeaModel } from "./entities/sea/seaModel";
import { SeaView } from "./entities/sea/seaView";
import { Score, Location } from "./interfaces";
import { loadImage } from "./movable/movable.view";

export class GameView {
    app: any;

    seaView: any;
    planeView: any;
    boatView: any;
    scores: any;

    constructor(
        app: any,
        scoresObj: HTMLDivElement,
    ) {
        this.app = app;
        this.scores = scoresObj;
    }

    init() {
        const bgContext: CanvasRenderingContext2D | null = this.createCanvasContext('bg').context;
        this.loadBGAssets(bgContext).then(() => {
            let sea = new SeaModel();
            this.seaView = new SeaView(bgContext, sea);
            this.seaView.draw();
        });

        const planeContext: CanvasRenderingContext2D | null = this.createCanvasContext('plane').context;
        let plane = new PlaneModel();
        this.planeView = new PlaneView(planeContext, plane);
        this.planeView.animate({
            x: CANVAS_WIDTH,
            y: 10
        });

        const boatContext: CanvasRenderingContext2D | null = this.createCanvasContext('boat').context;
        let boat = new BoatModel();
        this.boatView = new BoatView(boatContext, boat);


        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.boatView.movable.move(false);
            }
            if (e.key === 'ArrowRight') {
                this.boatView.movable.move(true);
            }
        });
    }

    loadBGAssets(bgContext: CanvasRenderingContext2D | null): Promise<any>{
        return loadImage('assets/background.png').then((image) => {
            bgContext?.drawImage(image,0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        });
    }

    createParachutist(location: Location): ParachutistModel {
        const { canvas, context } = this.createCanvasContext('parachutist');
        const parachutist = new ParachutistModel({location: location});
        const parachutistView = new ParachutistView(context, parachutist);
        return parachutist;
    }

    updateScores(scores: Score) {
        this.scores.innerText = `SCORE: ${scores.score} LIVES: ${scores.lives}`;
    }

    createCanvasContext(id: string): 
        {
            canvas: HTMLCanvasElement, 
            context: CanvasRenderingContext2D | null
        } 
    {
        const newCanvas: HTMLCanvasElement = document.createElement('canvas');

        newCanvas.width = CANVAS_WIDTH;
        newCanvas.height = CANVAS_HEIGHT;
        newCanvas.className = id;

        this.app.appendChild(newCanvas);

        return {canvas: newCanvas, context: newCanvas.getContext("2d")};
    }
}
