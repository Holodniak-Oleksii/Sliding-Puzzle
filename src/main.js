import { Application } from "pixi.js";
import { Menu } from "./core/Menu";

(async () => {
  const app = new Application();

  await app.init({
    background: "#9a6503",
    width: 1000,
    height: 620,
  });
  document.body.appendChild(app.canvas);
  globalThis.__PIXI_APP__ = app;
  new Menu(app);
})();
