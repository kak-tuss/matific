import { MovableView } from "../../movable/movable.view";
import { PlaneModel } from "./planeModel";

export class PlaneView extends MovableView {
    constructor(contextObj: any, movable: PlaneModel) {
        super(contextObj, movable);
    }
}