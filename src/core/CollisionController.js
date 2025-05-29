import { TILE_SIZE } from "../constants";

export class CollisionController {
  constructor(levelMap) {
    this.levelMap = levelMap;
  }

  isPassable(gridX, gridY) {
    if (
      gridY < 0 ||
      gridY >= this.levelMap.length ||
      gridX < 0 ||
      gridX >= this.levelMap[gridY].length
    ) {
      return false;
    }

    const cell = this.levelMap[gridY][gridX];
    return cell !== 0;
  }

  check(prevPos, targetPos) {
    let updatedPos = { ...prevPos };

    const dx = targetPos.x - prevPos.x;
    const dy = targetPos.y - prevPos.y;

    const lerpFactor = 0.1;
    const stepX = dx * lerpFactor;
    const stepY = dy * lerpFactor;

    if (this.canMoveTo({ x: prevPos.x + stepX, y: prevPos.y + stepY })) {
      updatedPos.x += stepX;
      updatedPos.y += stepY;
    } else {
      if (this.canMoveTo({ x: prevPos.x + stepX, y: prevPos.y })) {
        updatedPos.x += stepX;
      }
      if (this.canMoveTo({ x: updatedPos.x, y: prevPos.y + stepY })) {
        updatedPos.y += stepY;
      }
    }

    return updatedPos;
  }

  canMoveTo(pos) {
    const corners = [
      { x: pos.x, y: pos.y },
      { x: pos.x + TILE_SIZE - 1, y: pos.y },
      { x: pos.x, y: pos.y + TILE_SIZE - 1 },
      { x: pos.x + TILE_SIZE - 1, y: pos.y + TILE_SIZE - 1 },
    ];

    for (const corner of corners) {
      const gridX = Math.floor(corner.x / TILE_SIZE);
      const gridY = Math.floor(corner.y / TILE_SIZE);
      if (!this.isPassable(gridX, gridY)) {
        return false;
      }
    }
    return true;
  }
}
