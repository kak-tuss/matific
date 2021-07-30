import { MovableView } from "../../movable/movable.view";
import { BoatModel } from "./boatModel";

export class BoatView extends MovableView {
    constructor(contextObj: any, movable: BoatModel) {
        super(contextObj, movable);
    }
}