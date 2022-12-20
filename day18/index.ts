import { file } from 'bun';
export const input = await file('input.txt').text();

type Cube = { x: number; y: number; z: number };
type Plane = boolean[][];
type Grid = boolean[][][];

const Directions = [
  { x: -1, y: 0, z: 0 }, // Up
  { x: 1, y: 0, z: 0 }, // Down
  { x: 0, y: -1, z: 0 }, // Left
  { x: 0, y: 1, z: 0 }, // Right
  { x: 0, y: 0, z: -1 }, // Front
  { x: 0, y: 0, z: 1 }, // Back
];

const int = (a: string | boolean) => +a;
const add = (a: number, b: number) => a + b;

const parse_cubes = (input: string): Cube[] => {
  return input
    .split('\n')
    .map(line => line.split(',').map(int))
    .map(([x, y, z]) => ({ x, y, z }));
};

const print_plane = (plane: Plane) => {
  plane.map(x => x.map(int)).map(x => console.log(x));
  console.log();
};

const create_grid = (cubes: Cube[], max: number) => {
  const grid: Grid = Array(max)
    .fill(null)
    .map(() =>
      Array(max)
        .fill(null)
        .map(() => Array(max).fill(false))
    );

  for (const { x, y, z } of cubes) {
    grid[x][y][z] = true;
  }
  return grid;
};

const calc_cube_surface_area = (cube: Cube, grid: Grid, max: number): number => {
  return Directions.map(dir => {
    const x = cube.x + dir.x;
    const y = cube.y + dir.y;
    const z = cube.z + dir.z;
    if (x < 0 || y < 0 || z < 0) return 1;
    if (x >= max || y >= max || z >= max) return 1;
    if (!grid[x][y][z]) return 1;
    return 0;
  }).reduce(add, 0);
};

const surround_grid = (grid: Grid, max: number) => {
  const new_max = max + 2;
  const air: Grid = Array(new_max)
    .fill(null)
    .map(() =>
      Array(new_max)
        .fill(null)
        .map(() => Array(new_max).fill(false))
    );

  for (const [x, plane] of grid.entries()) {
    for (const [y, row] of plane.entries()) {
      for (const [z, cell] of row.entries()) {
        air[x + 1][y + 1][z + 1] = cell;
      }
    }
  }
  return air;
};

const ugly_bfs_surface = (grid: Grid) => {
  const max = grid.length;
  let area = 0;
  let visits = 0;
  const start = { x: 0, y: 0, z: 0 };

  const visited = create_grid([start], max);

  const queue: Cube[] = [];

  const visit_cube = (cube: Cube) => {
    visited[cube.x][cube.y][cube.z] = true;
    queue.push(cube);
    visits++;
  };

  const in_bounds = ({ x, y, z }) => {
    if (x < 0 || y < 0 || z < 0) return false;
    if (x >= max || y >= max || z >= max) return false;
    return true;
  };

  const can_visit = ({ x, y, z }) => {
    if (visited[x][y][z] == true) return false;
    if (grid[x][y][z] == true) return false;
    return true;
  };

  visit_cube(start);

  while (queue.length) {
    const cube = queue.shift();

    for (const dir of Directions) {
      const x = cube.x + dir.x;
      const y = cube.y + dir.y;
      const z = cube.z + dir.z;

      if (in_bounds({ x, y, z }) && can_visit({ x, y, z })) visit_cube({ x, y, z });
      if (in_bounds({ x, y, z }) && grid[x][y][z]) area++;
    }
  }
  return area;
};

const part1 = (input: string) => {
  const cubes = parse_cubes(input);
  const max = Math.max(...cubes.map(({ x, y, z }) => Math.max(x, y, z))) + 1;
  const grid = create_grid(cubes, max);

  // grid.forEach(plane => print_plane(plane));
  let count = 0;

  for (const [x, plane] of grid.entries()) {
    for (const [y, row] of plane.entries()) {
      for (const [z, cell] of row.entries()) {
        if (!!cell) count += calc_cube_surface_area({ x, y, z }, grid, max);
      }
    }
  }
  return count;
};

const part2 = (input: string) => {
  const cubes = parse_cubes(input);
  const max = Math.max(...cubes.map(({ x, y, z }) => Math.max(x, y, z))) + 1;
  const grid = create_grid(cubes, max);
  const air = surround_grid(grid, max);

  return ugly_bfs_surface(air);
};

export const day18 = {
  part1,
  part2,
};

process.env.part && console.log(day18[process.env.part](input));
