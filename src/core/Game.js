import { Assets, Container } from "pixi.js";
import { BLOCK, TILE_SIZE } from "../constants";
import { Level } from "./Level";

export class Game {
  constructor(app, level) {
    this.app = app;
    this.levelMap = level;
    this.container = new Container();
    this.container.zIndex = 1;

    this.loadAssets();
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
    ]);

    this.startGame();
  }

  startGame() {
    const mapWidth = this.levelMap[0].length * TILE_SIZE;
    const mapHeight = this.levelMap.length * TILE_SIZE;

    this.container.x = (this.app.screen.width - mapWidth) / 2;
    this.container.y = (this.app.screen.height - mapHeight) / 2;

    new Level(this.app, this.levelMap, this.container);
    this.app.stage.addChild(this.container);
  }

  destroy() {
    if (this.container) {
      this.app.stage.removeChild(this.container);
      this.container.destroy({
        children: true,
        texture: false,
        baseTexture: false,
      });
      this.container = null;
    }
  }
}
