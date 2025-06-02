import { Assets, Sprite } from "pixi.js";
import { Button } from "../entities/Button";
import level1 from "../levels/1.json";
import level2 from "../levels/2.json";
import level3 from "../levels/3.json";

import { Game } from "./Game";

export class Menu {
  constructor(app) {
    this.app = app;
    this.levelsList = [level1, level2, level3];
    this.buttons = [];
    this.game = null;
    this.loadAssets();
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
  }

  startGameByLevel(level) {
    this.hideMenu();
    this.game = new Game(this.app, level);
  }

  hideMenu() {
    this.buttons.forEach((button) => (button.visible = false));
  }

  showMenu() {
    if (this.background) this.background.visible = true;
    this.buttons.forEach((button) => (button.visible = true));

    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
  }
}
