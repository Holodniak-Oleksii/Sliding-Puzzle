import { BLOCK } from "../constants";
import { BorderBlock, StaticCell, Stone, TargetZone } from "./Block";
import { DraggableCell } from "./DraggableCell";

export class BlockFactory {
  static createBlock(type, x, y) {
    if (!type) return new BorderBlock(x, y);

    const draggableTypes = [BLOCK.AIR, BLOCK.FIRE, BLOCK.GROUND, BLOCK.WATER];
    if (draggableTypes.includes(type)) {
      return new DraggableCell(x, y, type, type);
    }

    const targetTypes = [
      BLOCK.TARGET_AIR,
      BLOCK.TARGET_FIRE,
      BLOCK.TARGET_GROUND,
      BLOCK.TARGET_WATER,
    ];
    if (targetTypes.includes(type)) {
      return new TargetZone(x, y, type);
    }
    if (type.split("_")[0] === BLOCK.WOOD) {
      return new DraggableCell(x, y, type, BLOCK.WOOD);
    }

    switch (type) {
      case BLOCK.STONE:
        return new Stone(x, y);
      case BLOCK.CELL:
        return new StaticCell(x, y);
      default:
        return null;
    }
  }
}
