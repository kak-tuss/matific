import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts";
import { BoatModel } from "./entities/boat/boatModel";
import { ParachutistModel } from "./entities/parachutist/parachutistModel";
import { ParachutistView } from "./entities/parachutist/parachutistView";
import { PlaneModel } from "./entities/plane/planeModel";
import { SeaModel } from "./entities/sea/seaModel";
import { Game } from "./game.model";
import { Score, Location } from "./interfaces";
import { MovableView } from "./movable/movable.view";
import { loadImage } from "./utils/utils";

export class GameView {
    app: any;

    seaView: any;
    planeView: any;
    boatView: any;

    model: Game;
    scores: any;

    constructor(
        app: any,
        scoresObj: HTMLDivElement,
        gameModel: Game
    ) {
        this.app = app;
        this.scores = scoresObj;
        this.model = gameModel;
    }

    init() {
        this.updateScores(this.model.scores);
        const bgContext: CanvasRenderingContext2D | null = this.createCanvasContext('bg');
        this.loadBGAssets(bgContext).then(() => {
            let sea = new SeaModel();
            this.seaView = new MovableView(bgContext, sea);
            this.seaView.draw();
        });

        const planeContext: CanvasRenderingContext2D | null = this.createCanvasContext('plane');
        let plane = new PlaneModel();
        this.planeView = new MovableView(planeContext, plane);
        this.planeView.animate({
            x: CANVAS_WIDTH,
            y: 10
        });

        const boatContext: CanvasRenderingContext2D | null = this.createCanvasContext('boat');
        let boat = new BoatModel();
        this.boatView = new MovableView(boatContext, boat);

        this.model.onChange.addListener((scores: Score) => {
            this.updateScores(scores);
        });

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
        const context = this.createCanvasContext('parachutist');
        const parachutist = new ParachutistModel({location: location});
        const parachutistView = new ParachutistView(context, parachutist);
        return parachutist;
    }

    updateScores(scores: Score) {
        this.scores.innerText = `SCORE: ${scores.score} LIVES: ${scores.lives}`;
    }

    createCanvasContext(className: string): CanvasRenderingContext2D | null {
        const newCanvas: HTMLCanvasElement = document.createElement('canvas');

        newCanvas.width = CANVAS_WIDTH;
        newCanvas.height = CANVAS_HEIGHT;
        newCanvas.className = className;

        this.app.appendChild(newCanvas);

        return newCanvas.getContext("2d");
    }

}
