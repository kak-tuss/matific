import { GAME_CONFIG } from "../../config";
import { MovableModel } from "../../movable/movable.model";
import { Location } from "../../interfaces"; 

const STEP = GAME_CONFIG.boat.step;
export class BoatModel extends MovableModel {
    constructor(initialLocation: Location) {
        super({
            location: initialLocation,
            spriteUrl: GAME_CONFIG.boat.asset,
            move: (direction: boolean) => {
                if (direction) {
                    return {
                        x: this.location.x + STEP,
                        y: this.location.y
                    }
                } else {
                    return {
                        x: this.location.x - STEP,
                        y: this.location.y
                    }
                }
            }
        });        
    }    
}