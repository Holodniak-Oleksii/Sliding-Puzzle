import { BLOCK } from "../constants";
import { DragControllerInstance } from "../controllers/DragController";
import { StaticCell } from "../entities/Block";
import { BlockFactory } from "../entities/Factory";
export class Level {
  constructor(app, levelMap, container) {
    this.app = app;
    this.container = container;
    this.container.sortableChildren = true;
    this.grid = [];
    this.levelMap = levelMap;
    this.updateRepeatedCells();
    this.loadMap();
  }

  updateRepeatedCells() {
    let count = 0;

    for (let y = 0; y < this.levelMap.length; y++) {
      for (let x = 0; x < this.levelMap[y].length; x++) {
        if (this.levelMap[y][x] === BLOCK.WOOD) {
          this.levelMap[y][x] = `${BLOCK.WOOD}_${count}`;
          count++;
        }
      }
    }
  }

  loadMap() {
    DragControllerInstance.init(this.app.stage, this.levelMap);
    for (let y = 0; y < this.levelMap.length; y++) {
      const row = this.levelMap[y];
      this.grid[y] = [];

      for (let x = 0; x < row.length; x++) {
        const symbol = row[x];

        if (BLOCK.WALL !== symbol) {
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
