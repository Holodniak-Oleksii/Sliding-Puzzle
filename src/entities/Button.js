import { Container, Graphics } from "pixi.js";
import { Label } from "./Label";

export class Button extends Container {
  constructor({
    text,
    onClick = () => {},
    x = 0,
    y = 0,
    width = 150,
    height = 50,
  }) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.background = new Graphics()
      .rect(0, 0, width, height, 10)
      .fill({ color: "#9a6503" })
      .stroke({ color: "#513605", width: 2 });

    this.addChild(this.background);

    this.label = new Label({ text });

    this.label.anchor.set(0.5);
    this.label.x = this.width / 2;
    this.label.y = this.height / 2;

    this.addChild(this.label);

    this.interactive = true;
    this.buttonMode = true;
    this.on("pointertap", onClick);
  }
}
