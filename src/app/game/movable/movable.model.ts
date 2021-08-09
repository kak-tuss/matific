import { Location } from "../interfaces";
export interface MovableObject {
    location: Location;
    spriteUrl: string;
    move: Function;
}

export const EMPTY_MOVABLE: MovableObject = {
    location: {
        x: 0, 
        y: 0
    },
    spriteUrl: '',
    move : () => {},
}

export class MovableModel {
    location: Location;
    spriteUrl: string;
    move: Function;

    constructor(
        {location, spriteUrl, move}: MovableObject = EMPTY_MOVABLE
    ){
        this.location = location;
        this.spriteUrl = spriteUrl;
        this.move = (params: any) => {
            this.location = move(params);
        }
    }
}