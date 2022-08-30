export interface TaskWaiter {
  waitFor(durationMs: number, block: () => Promise<void>): Promise<void>;
}
