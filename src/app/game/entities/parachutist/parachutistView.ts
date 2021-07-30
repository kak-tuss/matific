import { MovableView } from "../../movable/movable.view";
import { ParachutistModel } from "./parachutistModel";

export class ParachutistView extends MovableView {
    constructor(contextObj: any, movable: ParachutistModel) {
        super(contextObj, movable);
        movable.hitBottom.addListener(() => {
            this.remove();
        });
    }
}