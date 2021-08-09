import { GAME_CONFIG } from "../../config";
import { MovableModel } from "../../movable/movable.model";
import { Location } from "../../interfaces";

export class PlaneModel extends MovableModel {
    constructor(initialLocation: Location) {
        super({
            location: initialLocation,
            spriteUrl: GAME_CONFIG.plane.asset,
            move: (): Location => {
                    return {
                        x: this.location.x - 1,
                        y: this.location.y
                    }                
            }
        });        
    }
}
