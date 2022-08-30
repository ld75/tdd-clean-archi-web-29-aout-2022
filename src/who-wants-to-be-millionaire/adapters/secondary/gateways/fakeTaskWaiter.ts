import { TaskWaiter } from "../../../hexagon/gateways/taskWaiter";

export class FakeTaskWaiter implements TaskWaiter {
  private _currentDelay: number = 0;

  async waitFor(durationMs: number, block: () => Promise<void>): Promise<void> {
    if (durationMs <= this.currentDelay) {
      return block();
    }
  }

  set currentDelay(value: number) {
    this._currentDelay = value;
  }
}
