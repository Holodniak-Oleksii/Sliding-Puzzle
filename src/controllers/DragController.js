import { Rectangle } from "pixi.js";
import { BLOCK, TILE_SIZE } from "../constants";
import { CollisionController } from "./CollisionController";
import { MoveController } from "./MoveController";

class DragController {
  constructor() {
    this.stage = null;
    this.activeItem = null;
    this.collision = null;
    this.move = null;
    this.levelMap = [];
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.testRect = new Rectangle(0, 0, TILE_SIZE, TILE_SIZE);
    this.oldItemGrid = { x: 0, y: 0 };
  }

  init(stage, levelMap) {
    if (this.stage) return;
    this.stage = stage;
    this.levelMap = levelMap;
    this.stage.eventMode = "static";
    this.stage.interactive = true;
    this.collision = new CollisionController(levelMap);
    this.move = new MoveController(levelMap);
    this.stage.on("pointermove", this.onPointerMove);
    this.stage.on("pointerup", this.onPointerUp);
  }

  startDrag(item) {
    this.activeItem = item;
    this.oldItemGrid = { x: item.view.x, y: item.view.y };
  }

  onPointerMove(event) {
    if (!this.activeItem || !this.activeItem.dragging) return;

    const pos = event.data.getLocalPosition(this.activeItem.view.parent);

    const prev = {
      x: this.activeItem.view.x,
      y: this.activeItem.view.y,
    };

    this.testRect.x = prev.x;
    this.testRect.y = prev.y;

    const target = {
      x: pos.x - TILE_SIZE / 2,
      y: pos.y - TILE_SIZE / 2,
    };

    const dx = target.x - this.testRect.x;
    const dy = target.y - this.testRect.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return;

    const stepX = dx / distance;
    const stepY = dy / distance;

    for (let i = 0; i < distance; i++) {
      if (stepX !== 0) {
        this.testRect.x += stepX;
        if (
          this.collision.checkCollisions(this.testRect, this.activeItem.type)
        ) {
          this.testRect.x -= stepX;
        }
      }

      if (stepY !== 0) {
        this.testRect.y += stepY;
        if (
          this.collision.checkCollisions(this.testRect, this.activeItem.type)
        ) {
          this.testRect.y -= stepY;
        }
      }
    }

    this.activeItem.onPointerMove(this.move.move(prev, this.testRect));
  }

  onPointerUp() {
    if (this.activeItem) {
      this.activeItem.onPointerUp();
      this.updateMap();
      this.move.endMove();
      this.activeItem = null;
      this.oldItemGrid = { x: 0, y: 0 };
    }
  }

  updateMap() {
    const type = this.activeItem.type;

    const oldGridX = Math.floor(this.oldItemGrid.x / TILE_SIZE);
    const oldGridY = Math.floor(this.oldItemGrid.y / TILE_SIZE);

    const newGridX = Math.floor(this.activeItem.view.x / TILE_SIZE);
    const newGridY = Math.floor(this.activeItem.view.y / TILE_SIZE);

    if (this.levelMap[oldGridY] && this.levelMap[oldGridY][oldGridX]) {
      this.levelMap[oldGridY][oldGridX] = BLOCK.CELL;
    }

    if (this.levelMap[newGridY] && this.levelMap[newGridY][newGridX]) {
      this.levelMap[newGridY][newGridX] = type;
    }
  }

  destroy() {
    if (!this.stage) return;
    this.stage.off("pointermove", this.onPointerMove);
    this.stage.off("pointerup", this.onPointerUp);
    this.stage = null;
  }
}

export const DragControllerInstance = new DragController();
