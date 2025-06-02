import { Container, Graphics, Sprite } from "pixi.js";
import { BLOCK, TILE_SIZE } from "../constants";

class BaseBlock {
  constructor(x, y, type, options = {}) {
    this.gridX = x;
    this.gridY = y;
    this.type = type;
    this.isDraggable = options.isDraggable ?? false;

    this.view = Sprite.from(type);
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
    this.view.height = TILE_SIZE;
    this.view.width = TILE_SIZE;
    this.view.zIndex = options.zIndex ?? 2;
    if (options.alpha !== undefined) this.view.alpha = options.alpha;
  }
}

export class TargetZone extends BaseBlock {
  constructor(x, y, type) {
    super(x, y, `-${type}`, { alpha: 0.7, zIndex: 2 });
  }
}

export class Stone extends BaseBlock {
  constructor(x, y) {
    super(x, y, BLOCK.STONE, { zIndex: 2 });
  }
}

export class StaticCell extends BaseBlock {
  constructor(x, y) {
    super(x, y, BLOCK.CELL, { alpha: 0.9, zIndex: 1 });
  }
}

export class BorderBlock {
  constructor(x, y) {
    this.gridX = x;
    this.gridY = y;
    this.type = BLOCK.WALL;
    this.view = new Container();

    const background = new Graphics().rect(0, 0, TILE_SIZE, TILE_SIZE);

    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
    this.view.height = TILE_SIZE;
    this.view.width = TILE_SIZE;
    this.view.zIndex = 1;
    this.view.addChild(background);
  }
}
