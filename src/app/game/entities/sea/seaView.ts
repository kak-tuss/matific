import { MovableView } from "../../movable/movable.view";
import { SeaModel } from "./seaModel";

export class SeaView extends MovableView {
    constructor(contextObj: any, movable: SeaModel) {
        super(contextObj, movable);
    }
}