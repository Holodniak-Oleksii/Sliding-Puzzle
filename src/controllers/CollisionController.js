import { TILE_SIZE, UN_COLLISION_BLOCKS } from "../constants";

export class CollisionController {
  constructor(levelMap) {
    this.levelMap = levelMap;
    this.mapWidth = levelMap[0].length;
    this.mapHeight = levelMap.length;
    this.collisionBlocks = [];
    this.init();
  }

  init() {
    for (let row of this.levelMap) {
      for (let cellType of row) {
        if (
          !UN_COLLISION_BLOCKS.includes(cellType) &&
          !this.collisionBlocks.includes(cellType)
        ) {
          this.collisionBlocks.push(cellType);
        }
      }
    }
  }

  checkCollisions(block, type) {
    const leftCell = Math.floor(block.x / TILE_SIZE);
    const rightCell = Math.floor((block.x + block.width - 1) / TILE_SIZE);
    const topCell = Math.floor(block.y / TILE_SIZE);
    const bottomCell = Math.floor((block.y + block.height - 1) / TILE_SIZE);
    const collisionArr = this.collisionBlocks.filter((e) => e !== type);

    for (let row = topCell; row <= bottomCell; row++) {
      for (let col = leftCell; col <= rightCell; col++) {
        if (
          row < 0 ||
          col < 0 ||
          row >= this.mapHeight ||
          col >= this.mapWidth ||
          collisionArr.includes(this.levelMap[row][col])
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
