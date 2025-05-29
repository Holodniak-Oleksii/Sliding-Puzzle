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
    const size = TILE_SIZE;

    const snappedX = Math.floor(targetPos.x / size) * size;
    const snappedY = Math.floor(targetPos.y / size) * size;
    const snappedPos = { x: snappedX, y: snappedY };

    const corners = [
      { x: snappedPos.x, y: snappedPos.y },
      { x: snappedPos.x + size - 1, y: snappedPos.y },
      { x: snappedPos.x, y: snappedPos.y + size - 1 },
      { x: snappedPos.x + size - 1, y: snappedPos.y + size - 1 },
    ];

    let collision = false;
    for (const corner of corners) {
      const gridX = Math.floor(corner.x / size);
      const gridY = Math.floor(corner.y / size);
      if (!this.isPassable(gridX, gridY)) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      return snappedPos;
    }

    const newX = { x: snappedX, y: prevPos.y };
    const newY = { x: prevPos.x, y: snappedY };

    let canMoveX = true,
      canMoveY = true;

    for (const corner of [
      { x: newX.x, y: newX.y },
      { x: newX.x + size - 1, y: newX.y },
      { x: newX.x, y: newX.y + size - 1 },
      { x: newX.x + size - 1, y: newX.y + size - 1 },
    ]) {
      const gridX = Math.floor(corner.x / size);
      const gridY = Math.floor(corner.y / size);
      if (!this.isPassable(gridX, gridY)) {
        canMoveX = false;
        break;
      }
    }

    for (const corner of [
      { x: newY.x, y: newY.y },
      { x: newY.x + size - 1, y: newY.y },
      { x: newY.x, y: newY.y + size - 1 },
      { x: newY.x + size - 1, y: newY.y + size - 1 },
    ]) {
      const gridX = Math.floor(corner.x / size);
      const gridY = Math.floor(corner.y / size);
      if (!this.isPassable(gridX, gridY)) {
        canMoveY = false;
        break;
      }
    }

    if (canMoveX && !canMoveY) {
      return newX;
    } else if (!canMoveX && canMoveY) {
      return newY;
    } else {
      return prevPos;
    }
  }
}
