import { BorderBlock, StaticCell, Stone, TargetZone } from "./Block";
import { DraggableCell } from "./DraggableCell";

export class BlockFactory {
  static createBlock(type, x, y) {
    if (!type) return new BorderBlock(x, y);

    const draggableTypes = ["-fire", "-water", "-air", "-ground"];
    if (draggableTypes.includes(type)) {
      return new DraggableCell(x, y, type.substring(1));
    }

    const targetTypes = ["fire", "water", "air", "ground"];
    if (targetTypes.includes(type)) {
      return new TargetZone(x, y, type);
    }

    switch (type) {
      case "stone":
        return new Stone(x, y);
      case "wood":
        return new DraggableCell(x, y, "wood");
      case "cell":
        return new StaticCell(x, y);
      default:
        return null;
    }
  }
}
