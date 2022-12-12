import { file } from 'bun';
export const input = await file('input.txt').text();

interface Vertex {
  v: number;
  h: number;
  elevation: string;
  distance: number;
  visited: boolean;
}

type Position = { v: number; h: number };

const printElevationMatrix = (m: Vertex[][]) => {
  m.map(row => console.log(row.map(({ elevation }) => elevation).join('')));
  console.log();
};
const printDistanceMatrix = (m: Vertex[][]) => {
  m.map(row => console.log(row.map(({ distance }) => distance).join(' ')));
  console.log();
};
const printVisitedMatrix = (m: Vertex[][]) => {
  m.map(row => console.log(row.map(({ visited }) => +visited).join('')));
  console.log();
};

const BFS = (grid: string[][], start_pos: Position, end_pos: Position) => {
  const m = grid.map((row, v) =>
    row.map((elevation, h) => ({ v, h, elevation, distance: 0, visited: false } as Vertex))
  );
  const start = m.at(start_pos.v).at(start_pos.h);
  const end = m.at(end_pos.v).at(end_pos.h);
  start.elevation = 'a';
  end.elevation = 'z';

  const queue = [start];
  start.visited = true;

  const inBounds = (v: number, h: number) => {
    if (v < 0 || v >= m.length) return false;
    if (h < 0 || h >= m.at(0).length) return false;
    return true;
  };

  const check = (current: Vertex, next: Vertex): boolean => {
    if (next.visited) return false;
    if (current.elevation.toLowerCase().charCodeAt(0) - next.elevation.toLowerCase().charCodeAt(0) < -1) return false;

    queue.push(next);
    next.visited = true;
    next.distance = current.distance + 1;

    return true;
  };

  while (queue.length) {
    const { v, h } = queue.shift();

    const current = m.at(v).at(h);

    if (inBounds(v - 1, h)) check(current, m.at(v - 1).at(h)); // up
    if (inBounds(v + 1, h)) check(current, m.at(v + 1).at(h)); // down
    if (inBounds(v, h - 1)) check(current, m.at(v).at(h - 1)); // left
    if (inBounds(v, h + 1)) check(current, m.at(v).at(h + 1)); // right
  }
  return m.at(end.v).at(end.h);
};

const find = (char: string, matrix: string[][]): Position => {
  let res = { v: -1, h: -1 };
  for (const [v, row] of matrix.entries()) {
    for (const [h, item] of row.entries()) {
      if (item === char) res = { v, h };
    }
  }
  return res;
};

const part1 = (input: string) => {
  const matrix = input.split('\n').map((row, v) => row.split(''));
  const start_pos = find('S', matrix);
  const end_pos = find('E', matrix);

  return BFS(matrix, start_pos, end_pos).distance;
};

const part2 = (input: string) => {
  const matrix = input.split('\n').map(row => row.split(''));
  const end_pos = find('E', matrix);
  const res = [];

  // todo: Search from the end instead
  for (const [v, row] of matrix.entries()) {
    for (const [h, x] of row.entries()) {
      if (x === 'a') res.push(BFS(matrix, { v, h }, end_pos));
    }
  }

  return res
    .sort((a, b) => a.distance - b.distance)
    .filter(({ distance }) => !!distance)
    .at(0).distance;
};

export const day12 = {
  part1,
  part2,
};

process.env.part && console.log(day12[process.env.part](input));
