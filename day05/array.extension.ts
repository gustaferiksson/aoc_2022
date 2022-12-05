export {};
declare global {
  interface Array<T> {
    transpose(): T[][];
  }
}

if (!Array.prototype.transpose) {
  // Yes, I know, I know. I shouldn't extend Array this way...
  Array.prototype.transpose = function transpose<T>(this: T[][]): T[][] {
    return this[0].map((_, i) => this.map(row => row[i]));
  };
}
