import { TILE_SIZE } from "../constants";

export class MoveController {
  constructor(levelMap) {
    this.levelMap = levelMap;
    this.mapWidth = levelMap[0].length * TILE_SIZE;
    this.mapHeight = levelMap.length * TILE_SIZE;

    this.currentDirection = null;
    this.isTurning = false;
    this.turnTargetX = null;
    this.turnTargetY = null;
  }

  endMove() {
    this.currentDirection = null;
    this.isTurning = false;
    this.turnTargetX = null;
    this.turnTargetY = null;
  }

  move(prevPos, targetPos) {
    const lerpFactor = 0.25;
    let currentX = prevPos.x;
    let currentY = prevPos.y;

    const isAlignedToGrid =
      Math.abs(currentX % TILE_SIZE) < 1 && Math.abs(currentY % TILE_SIZE) < 1;
    if (this.isTurning) {
      currentX += (this.turnTargetX - currentX) * lerpFactor;
      currentY += (this.turnTargetY - currentY) * lerpFactor;

      const turnThreshold = 1;

      if (
        Math.abs(this.turnTargetX - currentX) < turnThreshold &&
        Math.abs(this.turnTargetY - currentY) < turnThreshold
      ) {
        this.isTurning = false;
        this.turnTargetX = null;
        this.turnTargetY = null;
      }
    } else {
      if (isAlignedToGrid) {
        const dx = Math.abs(targetPos.x - currentX);
        const dy = Math.abs(targetPos.y - currentY);

        let potentialNextDirection = this.currentDirection;

        if (dx > dy + 1) {
          potentialNextDirection = "horizontal";
        } else if (dy > dx + 1) {
          potentialNextDirection = "vertical";
        }

        if (potentialNextDirection !== this.currentDirection) {
          this.isTurning = true;
          this.currentDirection = potentialNextDirection;

          if (this.currentDirection === "horizontal") {
            this.turnTargetX = targetPos.x;
            this.turnTargetY = currentY;
          } else {
            this.turnTargetX = currentX;
            this.turnTargetY = targetPos.y;
          }
        }
      }

      if (!this.isTurning) {
        if (this.currentDirection === "horizontal") {
          currentX += (targetPos.x - currentX) * lerpFactor;
        } else if (this.currentDirection === "vertical") {
          currentY += (targetPos.y - currentY) * lerpFactor;
        }
      }
    }

    return { x: currentX, y: currentY };
  }
}
