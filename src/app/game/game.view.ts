import { GAME_CONFIG } from "./config";
import { ParachutistModel } from "./entities/parachutist/parachutist.model";
import { Game } from "./game.model";
import { Score, Location } from "./interfaces";
import { MovableView } from "./movable/movable.view";
import { loadImage, createCanvasContext } from "./utils/utils";

export class GameView {
    app: any;

    seaView: any;
    planeView: any;
    boatView: any;

    parachutists: any[] = [];

    halfBoat: number = 0;

    game: Game;
    scores: any;

    constructor(
        app: any,
        scoresObj: HTMLDivElement,
        gameModel: Game
    ) {
        this.app = app;
        this.scores = scoresObj;
        this.game = gameModel;
    }

    init() {
        this.updateScoresDisplay(this.game.getScores());
        const bgContext: CanvasRenderingContext2D | null = createCanvasContext(this.app, 'bg');
        this.loadBGAssets(bgContext);

        const boatContext: CanvasRenderingContext2D | null = createCanvasContext(this.app, 'boat');
        this.boatView = new MovableView(boatContext, this.game.boat);
        this.renderBoat();

        this.halfBoat = Math.round(this.boatView.imageWidth / 2);

        const planeContext: CanvasRenderingContext2D | null = createCanvasContext(this.app, 'plane');
        this.planeView = new MovableView(planeContext, this.game.plane);
        this.renderPlane();
    }

    loadBGAssets(bgContext: CanvasRenderingContext2D | null): Promise<any>{
        return loadImage(GAME_CONFIG.background).then((bgImage) => {
            bgContext?.drawImage(bgImage,0,0, GAME_CONFIG.canvas_size.width, GAME_CONFIG.canvas_size.height);
            loadImage(GAME_CONFIG.sea).then((seaImage) => {
                bgContext?.drawImage(
                    seaImage, 
                    0, 
                    GAME_CONFIG.canvas_size.height - GAME_CONFIG.canvas_size.sea_depth, 
                    GAME_CONFIG.canvas_size.width, 
                    GAME_CONFIG.canvas_size.sea_depth);
            })
        });
    }

    renderPlane() {
        if (this.game.plane.location.x <= -1 * this.planeView.imageWidth) {
            this.game.plane.location.x = GAME_CONFIG.canvas_size.width;
        }
        this.planeView.animate();
    }

    renderBoat() {
        if (this.game.boat.location.x < -1 * this.halfBoat) {
            this.game.boat.location.x = -1 * this.halfBoat;
        }
        if (this.game.boat.location.x > GAME_CONFIG.canvas_size.width + this.halfBoat) {
            this.game.boat.location.x = GAME_CONFIG.canvas_size.width + this.halfBoat;
        }
        this.boatView.animate();
    }

    createParachutist(location: Location): ParachutistModel {
        const context = createCanvasContext(this.app, 'parachutist');
        const parachutist = new ParachutistModel(location);
        const parachutistView = new MovableView(context, parachutist);
        this.parachutists.push(parachutist);
        return parachutist;
    }

    updateScoresDisplay(scores: Score) {
        this.scores.innerText = `SCORE: ${scores.score} LIVES: ${scores.lives}`;
    }
}
