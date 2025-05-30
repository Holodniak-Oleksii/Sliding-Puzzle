import { TILE_SIZE } from "../constants";
import { CollisionController } from "./CollisionController";
import { MoveController } from "./MoveController";

class DragController {
  constructor() {
    this.stage = null;
    this.activeItem = null;
    this.collision = null;
    this.move = null;
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  init(stage, levelMap) {
    if (this.stage) return;
    this.stage = stage;
    this.stage.eventMode = "static";
    this.stage.interactive = true;
    this.collision = new CollisionController(levelMap);
    this.move = new MoveController(levelMap);
    this.stage.on("pointermove", this.onPointerMove);
    this.stage.on("pointerup", this.onPointerUp);
  }

  startDrag(item) {
    this.activeItem = item;
  }

  onPointerMove(event) {
    if (!this.activeItem || !this.activeItem.dragging) return;

    const pos = event.data.getLocalPosition(this.activeItem.view.parent);

    const prev = {
      x: this.activeItem.view.x,
      y: this.activeItem.view.y,
    };

    const target = {
      x: pos.x - TILE_SIZE / 2,
      y: pos.y - TILE_SIZE / 2,
    };

    this.activeItem?.onPointerMove(this.move.move(prev, target));
  }

  onPointerUp() {
    if (this.activeItem) {
      this.activeItem.onPointerUp();
      this.activeItem = null;
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
