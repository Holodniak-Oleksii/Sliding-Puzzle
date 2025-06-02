import { Assets, Container, Sprite } from "pixi.js";
import { BLOCK, TILE_SIZE } from "../constants";
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
      { alias: BLOCK.STONE, src: "assets/images/stone.png" },
      { alias: BLOCK.WOOD, src: "assets/images/wood.png" },
      { alias: BLOCK.CELL, src: "assets/images/cell.png" },

      { alias: BLOCK.AIR, src: "assets/images/air.png" },
      { alias: BLOCK.FIRE, src: "assets/images/fire.png" },
      { alias: BLOCK.GROUND, src: "assets/images/ground.png" },
      { alias: BLOCK.WATER, src: "assets/images/water.png" },
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
