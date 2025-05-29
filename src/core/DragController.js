import { CollisionController } from "./CollisionController";

class DragController {
  constructor() {
    this.stage = null;
    this.activeItem = null;
    this.collision = null;
    this.offset = { x: 0, y: 0 };
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  init(stage, levelMap) {
    if (this.stage) return;
    this.stage = stage;
    this.stage.eventMode = "static";
    this.stage.interactive = true;
    this.collision = new CollisionController(levelMap);
    this.stage.on("pointermove", this.onPointerMove);
    this.stage.on("pointerup", this.onPointerUp);
  }

  startDrag(item) {
    this.activeItem = item;
    this.offset = item.dragOffset;
  }

  onPointerMove(event) {
    if (this.activeItem) {
      const pos = event.data.getLocalPosition(this.activeItem.view.parent);

      const target = {
        x: pos.x - this.offset.x,
        y: pos.y - this.offset.y,
      };

      const prev = {
        x: this.activeItem.view.x,
        y: this.activeItem.view.y,
      };

      this.activeItem?.onPointerMove(this.collision.check(prev, target));
    }
  }

  onPointerUp() {
    if (this.activeItem) {
      this.activeItem?.onPointerUp();
      this.activeItem = null;
      this.offset = { x: 0, y: 0 };
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
