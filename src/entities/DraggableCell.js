import { Sprite } from "pixi.js";
import { TILE_SIZE } from "../constants";

export class DraggableCell {
  constructor(x, y, elementType) {
    this.gridX = x;
    this.gridY = y;
    this.elementType = elementType;
    this.isDraggable = true;
    this.type = "element";

    this.view = Sprite.from(elementType);
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
    this.view.eventMode = "static";
    this.view.cursor = "pointer";
    this.view.anchor.set(0);
    this.view.zIndex = 3;

    this.dragging = false;

    this.view.on("pointerdown", this.onPointerDown.bind(this));
    this.view.on("pointerup", this.onPointerUp.bind(this));
    this.view.on("pointerupoutside", this.onPointerUp.bind(this));
    this.view.on("pointermove", this.onPointerMove.bind(this));
  }

  onPointerDown(event) {
    this.dragging = true;
    this.dragOffset = event.data.getLocalPosition(this.view.parent);
    this.dragOffset.x -= this.view.x;
    this.dragOffset.y -= this.view.y;
  }

  onPointerMove(event) {
    if (!this.dragging) return;

    const pos = event.data.getLocalPosition(this.view.parent);
    this.view.x = pos.x - this.dragOffset.x;
    this.view.y = pos.y - this.dragOffset.y;
  }

  onPointerUp(grid) {
    if (!this.dragging) return;
    this.dragging = false;

    const newX = Math.round(this.view.x / 64);
    const newY = Math.round(this.view.y / 64);

    if (grid[newY] && grid[newY][newX]) {
      this.gridX = newX;
      this.gridY = newY;
      this.view.x = newX * 64;
      this.view.y = newY * 64;
    } else {
      this.view.x = this.gridX * 64;
      this.view.y = this.gridY * 64;
    }
  }
}
