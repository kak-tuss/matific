import { MovableView } from "../../movable/movable.view";
import { ParachutistModel } from "./parachutist.model";
import { Location } from "../../interfaces";
import { Event, createCanvasContext } from "../../utils/utils";
import { GAME_CONFIG } from "../../config";

export class ParachutistController {

    parachutist: ParachutistModel;
    parachutistView: MovableView;
    
    context: CanvasRenderingContext2D | null;

    fallInterval: any;
    hitBottom: Event = new Event();

    constructor(app: any, initialLocation: Location) {
        this.context = createCanvasContext(app, 'parachutist');
        this.parachutist = new ParachutistModel(initialLocation);
        this.parachutistView = new MovableView(this.context, this.parachutist);
    }

    start() {
        this.fallInterval = setInterval(
            (function(self) {
                return function() {
                    if (self.parachutist.location.y < GAME_CONFIG.canvas_size.height - GAME_CONFIG.canvas_size.sea_depth - self.parachutistView.imageHeight) {
                        self.parachutist.location = self.parachutist.move();
                        self.parachutistView.animate();
                    } else {
                        clearInterval(self.fallInterval);
                        self.parachutistView.remove();
                        self.hitBottom.trigger(self.parachutist.location.x);
                    }
                }
            }(this)),
        GAME_CONFIG.parachutist.speed);
    }
}
