import { Text, TextStyle } from "pixi.js";

export class Label extends Text {
  constructor({ text = "" }) {
    super();

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 24,
      fontWeight: "bold",
      fill: { color: "#fff" },
      stroke: { color: "#000", width: 3, join: "round" },
      wordWrap: true,
      wordWrapWidth: 440,
    });

    this.style = style;
    this.text = text;
  }
}
