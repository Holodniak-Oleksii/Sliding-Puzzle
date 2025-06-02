import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class Button extends Container {
  constructor({ text, onClick = () => {}, x = 0, y = 0 }) {
    super();
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 50;

    this.background = new Graphics()
      .rect(0, 0, 150, 50, 10)
      .fill({ color: "#9a6503" })
      .stroke({ color: "#513605", width: 2 });

    this.addChild(this.background);

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 28,
      fontWeight: "bold",
      fill: { color: "#fff" },
      stroke: { color: "#000", width: 3, join: "round" },
      wordWrap: true,
      wordWrapWidth: 440,
    });

    this.label = new Text({
      text: text,
      style,
    });

    this.label.anchor.set(0.5);
    this.label.x = this.width / 2;
    this.label.y = this.height / 2;

    this.addChild(this.label);

    this.interactive = true;
    this.buttonMode = true;
    this.on("pointertap", onClick);
  }
}
