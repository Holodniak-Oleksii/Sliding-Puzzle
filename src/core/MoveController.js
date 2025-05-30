import { TILE_SIZE } from "../constants";

export class MoveController {
  constructor(levelMap) {
    this.levelMap = levelMap;
  }

  move(prevPos, targetPos) {
    const deltaX = targetPos.x - prevPos.x;
    const deltaY = targetPos.y - prevPos.y;

    let newX = prevPos.x;
    let newY = prevPos.y;

    newX = Math.round(targetPos.x / TILE_SIZE) * TILE_SIZE;
    newY = Math.round(targetPos.y / TILE_SIZE) * TILE_SIZE;
    console.log("1", newX === prevPos.x);
    console.log(newY === prevPos.y);

    if (newX === prevPos.x) {
      newY = targetPos.y;
    }
    if (newY === prevPos.y) {
      newX = targetPos.x;
    }

    return { x: newX, y: newY };
  }
}
