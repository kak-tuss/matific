import { Component, OnInit } from '@angular/core';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './game/consts';
import { GameView } from './game/game.view';
import { GameController } from './game/game.controller';


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
    const scoresElement: HTMLDivElement = document.createElement('div');

    scoresElement.className = 'scores'
    app?.appendChild(scoresElement);

    const game = new GameController(app, scoresElement);
    game.startGame();
    

  }
}
