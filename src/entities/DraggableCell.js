import { Sprite } from "pixi.js";
import { TILE_SIZE } from "../constants";
import { DragControllerInstance } from "../controllers/DragController";

export class DraggableCell {
  constructor(x, y, type, spriteName) {
    this.gridX = x;
    this.gridY = y;
    this.type = type;
    this.view = Sprite.from(spriteName);
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
    this.view.height = TILE_SIZE;
    this.view.width = TILE_SIZE;
    this.view.eventMode = "static";
    this.view.cursor = "pointer";
    this.view.anchor.set(0);
    this.view.zIndex = 3;

    this.dragging = false;

    this.view.on("pointerdown", () => {
      this.dragging = true;
      DragControllerInstance.startDrag(this);
    });
  }

  onPointerMove(newPos) {
    if (!this.dragging) return;
    this.view.x = newPos.x;
    this.view.y = newPos.y;
  }

  onPointerUp() {
    if (!this.dragging) return;

    this.gridX = Math.round(this.view.x / TILE_SIZE);
    this.gridY = Math.round(this.view.y / TILE_SIZE);
    this.view.x = this.gridX * TILE_SIZE;
    this.view.y = this.gridY * TILE_SIZE;
    this.dragging = false;
  }
}
