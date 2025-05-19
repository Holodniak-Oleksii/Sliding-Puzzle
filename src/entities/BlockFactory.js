import { DraggableCell } from "./DraggableCell";
import { StaticCell } from "./StaticCell";
import { Stone } from "./Stone";
import { TargetZone } from "./TargetZone";
import { Wood } from "./Wood";

export class BlockFactory {
  static createBlock(type, x, y) {
    if (!type) return null;

    switch (type) {
      case "stone":
        return new Stone(x, y);
      case "wood":
        return new Wood(x, y);
      case "fire":
      case "water":
      case "air":
      case "ground":
        return new TargetZone(x, y, type);
      case "-fire":
      case "-water":
      case "-air":
      case "-ground":
        return new DraggableCell(x, y, type.substring(1));
      default:
        return null;
    }
  }
}
