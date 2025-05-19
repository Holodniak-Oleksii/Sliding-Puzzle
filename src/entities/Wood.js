import { Sprite } from "pixi.js";
import { TILE_SIZE } from "../constants";

export class Wood {
  constructor(x, y) {
    this.gridX = x;
    this.gridY = y;
    this.isDraggable = true;
    this.type = "wood";

    this.view = Sprite.from("wood");
    this.view.zIndex = 2;
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
  }
}
