import { Ticker } from "pixi.js";
import { DragControllerInstance } from "../controllers/DragController";

export class Timer {
  constructor(durationMinutes, onTimerEnd, label) {
    this.durationMs = durationMinutes * 60 * 1000;
    this.onTimerEnd = onTimerEnd;
    this.label = label;

    this.remainingTimeMs = this.durationMs;
    this.ticker = new Ticker();

    this.updateTimer = this.updateTimer.bind(this);
  }

  start() {
    this.ticker.add(this.updateTimer);
    this.ticker.start();
    this.updateLabel();
  }

  stop() {
    this.ticker.remove(this.updateTimer);
    this.ticker.stop();
    this.remainingTimeMs = this.durationMs;
    this.disableDragging();
  }

  updateTimer() {
    this.remainingTimeMs -= this.ticker.elapsedMS;
    this.updateLabel();
    if (this.remainingTimeMs <= 0) {
      this.remainingTimeMs = 0;
      this.onTimerEnd();
    }
  }

  updateLabel() {
    const totalSeconds = Math.max(0, Math.floor(this.remainingTimeMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    this.label.text = `Time: ${formattedMinutes}:${formattedSeconds}`;
  }

  disableDragging() {
    if (DragControllerInstance) {
      DragControllerInstance.destroy();
    }
  }
}
