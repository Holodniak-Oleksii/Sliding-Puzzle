import { Sprite } from "pixi.js";
import { TILE_SIZE } from "../constants";

export class TargetZone {
  constructor(x, y, type) {
    this.gridX = x;
    this.gridY = y;
    this.type = type;

    this.view = Sprite.from(type);
    this.view.alpha = 0.7;
    this.view.zIndex = 2;
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
  }
}
