import { GAME_CONFIG } from "../../config";
import { MovableModel } from "../../movable/movable.model";
import { Location } from "../../interfaces";

export class ParachutistModel extends MovableModel {
    constructor(initialLocation: Location) {
        super({
            location: initialLocation,
            spriteUrl: GAME_CONFIG.parachutist.asset,
            move: (): Location => {
                return {
                    x: this.location.x,
                    y: this.location.y + GAME_CONFIG.parachutist.step
                }
            }
        }); 
    }
}