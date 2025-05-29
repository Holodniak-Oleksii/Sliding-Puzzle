import { Assets, Container, Sprite } from "pixi.js";
import { TILE_SIZE } from "../constants";
import level1 from "../levels/1.json";
import { Level } from "./Level";

export class Game {
  constructor(app) {
    this.app = app;
    this.loadAssets();
    this.levelMap = level1;
  }

  async loadAssets() {
    await Assets.load([
      { alias: "stone", src: "assets/images/stone.png" },
      { alias: "wood", src: "assets/images/wood.png" },
      { alias: "cell", src: "assets/images/cell.png" },

      { alias: "air", src: "assets/images/air.png" },
      { alias: "fire", src: "assets/images/fire.png" },
      { alias: "ground", src: "assets/images/ground.png" },
      { alias: "water", src: "assets/images/water.png" },
      { alias: "background", src: "assets/images/background.jpg" },
    ]);

    this.startGame();
  }

  startGame() {
    const bg = Sprite.from("background");
    bg.width = this.app.screen.width;
    bg.height = this.app.screen.height;
    bg.zIndex = 0;

    const mapWidth = this.levelMap[0].length * TILE_SIZE;
    const mapHeight = this.levelMap.length * TILE_SIZE;

    const levelWrapper = new Container();
    levelWrapper.zIndex = 1;

    levelWrapper.x = (this.app.screen.width - mapWidth) / 2;
    levelWrapper.y = (this.app.screen.height - mapHeight) / 2;

    levelWrapper.addChild(bg);
    new Level(this.app, this.levelMap, levelWrapper);

    this.app.stage.addChild(bg);
    this.app.stage.addChild(levelWrapper);
  }
}
