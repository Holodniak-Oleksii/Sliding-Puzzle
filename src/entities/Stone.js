import { Sprite } from "pixi.js";
import { TILE_SIZE } from "../constants";

export class Stone {
  constructor(x, y) {
    this.gridX = x;
    this.gridY = y;
    this.type = "stone";

    this.view = Sprite.from("stone");
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
    this.view.zIndex = 2;
  }
}
