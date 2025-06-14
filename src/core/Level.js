import { BLOCK, TARGET_TO_BLOCK } from "../constants";
import { DragControllerInstance } from "../controllers/DragController";
import { StaticCell } from "../entities/Block";
import { FactoryInstance } from "../entities/Factory";
export class Level {
  constructor(app, levelMap, container, onWin) {
    this.app = app;
    this.container = container;
    this.container.sortableChildren = true;
    this.grid = [];
    this.onWin = onWin;
    this.levelMap = levelMap;
    this.targetZones = {};
    this.updateRepeatedCells();
    this.loadMap();
  }

  updateRepeatedCells() {
    let count = 0;

    for (let y = 0; y < this.levelMap.length; y++) {
      for (let x = 0; x < this.levelMap[y].length; x++) {
        if (!!TARGET_TO_BLOCK[this.levelMap[y][x]]) {
          this.targetZones[TARGET_TO_BLOCK[this.levelMap[y][x]]] = [y, x];
        }
        if (this.levelMap[y][x] === BLOCK.WOOD) {
          this.levelMap[y][x] = `${BLOCK.WOOD}_${count}`;
          count++;
        }
      }
    }
  }

  loadMap() {
    DragControllerInstance.init(
      this.app.stage,
      this.levelMap,
      this.onWin,
      this.targetZones
    );
    for (let y = 0; y < this.levelMap.length; y++) {
      const row = this.levelMap[y];
      this.grid[y] = [];

      for (let x = 0; x < row.length; x++) {
        const symbol = row[x];

        if (BLOCK.WALL !== symbol) {
          const cell = new StaticCell(x, y);
          this.container.addChild(cell.view);
        }

        const block = FactoryInstance.createBlock(symbol, x, y);
        if (block) {
          this.container.addChild(block.view);
        }
      }
    }
  }
}
