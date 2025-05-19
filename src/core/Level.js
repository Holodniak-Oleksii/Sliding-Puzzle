import { Container } from "pixi.js";
import { EXCLUDED_BLOCK } from "../constants";
import { BlockFactory } from "../entities/BlockFactory";
import { StaticCell } from "../entities/StaticCell";

export class Level {
  constructor(app, levelMap) {
    this.app = app;
    this.container = new Container();
    this.container.sortableChildren = true;
    this.grid = [];
    this.levelMap = levelMap;

    this.loadMap();
  }

  loadMap() {
    for (let y = 0; y < this.levelMap.length; y++) {
      const row = this.levelMap[y];
      this.grid[y] = [];

      for (let x = 0; x < row.length; x++) {
        const symbol = row[x];

        if (EXCLUDED_BLOCK.includes(symbol)) {
          const cell = new StaticCell(x, y);
          this.container.addChild(cell.view);
        }

        const block = BlockFactory.createBlock(symbol, x, y);
        if (block) {
          this.container.addChild(block.view);
        }
      }
    }
  }
}
