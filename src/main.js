import { Application } from "pixi.js";
import { Game } from "./core/Game";

(async () => {
  const app = new Application();

  await app.init({
    background: "#9a6503",
    width: 1000,
    height: 700,
  });

  document.body.appendChild(app.canvas);

  new Game(app);
})();
