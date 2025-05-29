import { Sprite } from "pixi.js";
import { TILE_SIZE } from "../../constants";
import { DragControllerInstance } from "../../core/DragController";

export class DraggableCell {
  constructor(x, y, elementType) {
    this.gridX = x;
    this.gridY = y;
    this.elementType = elementType;
    this.view = Sprite.from(elementType);
    this.view.x = x * TILE_SIZE;
    this.view.y = y * TILE_SIZE;
    this.view.eventMode = "static";
    this.view.cursor = "pointer";
    this.view.anchor.set(0);
    this.view.zIndex = 3;

    this.dragging = false;
    this.dragOffset = { x: 0, y: 0 };

    this.view.on("pointerdown", (event) => {
      this.dragging = true;

      const pos = event.data.getLocalPosition(this.view.parent);
      this.dragOffset.x = pos.x - this.view.x;
      this.dragOffset.y = pos.y - this.view.y;

      DragControllerInstance.startDrag(this);
    });
  }

  onPointerMove(pos) {
    if (!this.dragging) return;
    this.view.x = pos.x;
    this.view.y = pos.y;
  }

  onPointerUp() {
    if (!this.dragging) return;
    this.dragging = false;
  }
}
