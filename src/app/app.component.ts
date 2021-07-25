import { Component, OnInit } from '@angular/core';
import { nextTick } from 'q';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './game/controller/consts';
import { GameController } from './game/controller/gameController';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task-matific';

  constructor() {}
  
  ngOnInit() {
    const app = document.getElementById('app-game');
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const bgCanvas: HTMLCanvasElement = document.createElement('canvas');
    const boatCanvas: HTMLCanvasElement = document.createElement('canvas');
    const scoresElement: HTMLDivElement = document.createElement('div');

    canvas.id = 'game';
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.className = 'game'

    bgCanvas.id = 'bg';
    bgCanvas.width = CANVAS_WIDTH;
    bgCanvas.height = CANVAS_HEIGHT;

    boatCanvas.id = 'boat';
    boatCanvas.width = CANVAS_WIDTH;
    boatCanvas.height = CANVAS_HEIGHT;
    boatCanvas.className = 'boat';

    scoresElement.className = 'scores'

    app?.appendChild(scoresElement);
    app?.appendChild(bgCanvas);
    app?.appendChild(canvas);
    app?.appendChild(boatCanvas);

    const game = new GameController(scoresElement, bgCanvas, canvas, boatCanvas);
    game.init();
    

  }
}
