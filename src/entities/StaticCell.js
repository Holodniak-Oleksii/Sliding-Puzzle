import { Sprite } from "pixi.js";
import { TILE_SIZE } from "../constants";

export class StaticCell {
  constructor(x, y) {
    this.gridX = x;
    this.gridY = y;
    this.type = "cell";
    this.view = Sprite.from("cell");
    this.view.alpha = 0.9;
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
    this.view.zIndex = 1;
  }
}
