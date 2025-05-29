import { EXCLUDED_BLOCK } from "../constants";
import { StaticCell } from "../entities/Block/Block";
import { BlockFactory } from "../entities/Block/Factory";
import { DragControllerInstance } from "./DragController";
export class Level {
  constructor(app, levelMap, container) {
    this.app = app;
    this.container = container;
    this.container.sortableChildren = true;
    this.grid = [];
    this.levelMap = levelMap;
    this.loadMap();
  }

  loadMap() {
    DragControllerInstance.init(this.app.stage, this.levelMap);
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
