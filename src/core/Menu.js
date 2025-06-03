import { Assets, Sprite } from "pixi.js";
import { Button } from "../entities/Button";
import level1 from "../levels/1.json";
import level2 from "../levels/2.json";
import level3 from "../levels/3.json";

import { Label } from "../entities/Label";
import { Game } from "./Game";
import { Timer } from "./Timer";

export class Menu {
  constructor(app) {
    this.app = app;
    this.levelsList = [
      { level: level1, time: 1 },
      { level: level2, time: 0.75 },
      { level: level3, time: 0.5 },
    ];
    this.buttons = [];
    this.backButton = null;

    this.label = new Label({ text: "" });
    this.label.y = 35;
    this.label.x = 25;
    this.label.visible = false;

    this.game = null;
    this.timer = null;

    this.loadAssets();

    this.onWin = this.onWin.bind(this);
    this.onLose = this.onLose.bind(this);
  }

  async loadAssets() {
    await Assets.load([
      { alias: "background", src: "assets/images/background.jpg" },
    ]);

    this.init();
  }

  init() {
    const background = Sprite.from("background");
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;
    background.zIndex = 0;

    this.app.stage.addChild(background);

    this.levelsList.forEach((l, i) => {
      const count = i + 1;
      const button = new Button({
        text: `Level ${count}`,
        onClick: () => this.startGameByLevel(l),
        x: this.app.screen.width / 2 - 75,
        y: 100 + 80 * count,
      });

      this.app.stage.addChild(button);
      this.buttons.push(button);
    });

    this.backButton = new Button({
      text: `Back`,
      onClick: () => this.showMenu(),
      x: this.app.screen.width - 125,
      y: 25,
      width: 100,
    });

    this.backButton.visible = false;
    this.app.stage.addChild(this.backButton);
    this.app.stage.addChild(this.label);
  }

  onLose() {
    this.label.visible = true;
    this.timer.stop();
    this.label.text = "You Lose!";
  }

  onWin() {
    this.label.visible = true;
    this.timer.stop();
    this.label.text = "You Win!";
  }

  startGameByLevel(level) {
    this.hideMenu();
    const levelMapCopy = level.level.map((row) => [...row]);
    this.game = new Game(this.app, levelMapCopy, () => this.onWin());
    this.label.visible = true;
    this.timer = new Timer(level.time, () => this.onLose(), this.label);
    this.timer.start();
  }

  hideMenu() {
    this.backButton.visible = true;
    this.buttons.forEach((button) => (button.visible = false));
  }

  showMenu() {
    this.buttons.forEach((button) => (button.visible = true));
    this.backButton.visible = false;
    this.label.visible = false;
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
    if (this.timer) {
      this.timer.stop();
      this.timer = null;
    }
  }
}
