import { BoatModel } from "./entities/boat/boat.model";
import { PlaneModel } from "./entities/plane/plane.model";
import { Score } from "./interfaces";

export class Game {
    scores: Score = {
        score: 0,
        lives: 3
    }
    boat: BoatModel;
    plane: PlaneModel;

    constructor(boat: BoatModel, plane: PlaneModel) {
        this.boat = boat;
        this.plane = plane;
    }
}