import { file } from 'bun';
export const input = await file('input.txt').text();

enum Material {
  Rock = '#',
  Sand = 'o',
}
type Coordinate = { x: number; y: number };
type Cave = Map<string, Material>;

const parse_paths = (input: string): Coordinate[][] => {
  return input.split('\n').map(path =>
    path.split(' -> ').map(coord => {
      const [x, y] = coord.split(',');
      return { x: +x, y: +y } as Coordinate;
    })
  );
};

const parse_cave = (paths: Coordinate[][]): Cave => {
  const cave = new Map() as Cave;

  for (const path of paths) {
    for (const [i, from] of path.entries()) {
      if (i === path.length - 1) break;
      const to = path.at(i + 1);
      const delta_x = Math.abs(from.x - to.x);
      const delta_y = Math.abs(from.y - to.y);
      cave.set(JSON.stringify(to), Material.Rock);
      cave.set(JSON.stringify(from), Material.Rock);
      for (const [i, _] of Array(delta_x).entries()) {
        cave.set(JSON.stringify({ x: Math.min(from.x, to.x) + i, y: from.y }), Material.Rock);
      }
      for (const [i, _] of Array(delta_y).entries()) {
        cave.set(JSON.stringify({ x: from.x, y: Math.min(from.y, to.y) + i }), Material.Rock);
      }
    }
  }

  return cave;
};

const solution = (input: string, break_all: boolean) => {
  const paths = parse_paths(input);

  const max_y = paths
    .flat()
    .sort((a: Coordinate, b: Coordinate) => a.y - b.y)
    .at(-1).y;

  const cave = parse_cave(paths);

  top: while (!cave.has(JSON.stringify({ x: 500, y: 0 }))) {
    let sand = { x: 500, y: 0 } as Coordinate;
    while (true) {
      if (sand.y >= max_y + 1) {
        cave.set(JSON.stringify(sand), Material.Sand);

        if (break_all) break top;
        break;
      }
      if (!cave.has(JSON.stringify({ x: sand.x, y: sand.y + 1 }))) {
        sand.y++;
        continue;
      }
      if (!cave.has(JSON.stringify({ x: sand.x - 1, y: sand.y + 1 }))) {
        sand.x--;
        sand.y++;
        continue;
      }
      if (!cave.has(JSON.stringify({ x: sand.x + 1, y: sand.y + 1 }))) {
        sand.x++;
        sand.y++;
        continue;
      }
      cave.set(JSON.stringify(sand), Material.Sand);
      break;
    }
    cave.set(JSON.stringify(sand), Material.Sand);
  }

  return [...cave.values()].filter(m => m === Material.Sand).length;
};

export const day14 = {
  part1: (input: string) => solution(input, true) - 1,
  part2: (input: string) => solution(input, false),
};

process.env.part && console.log(day14[process.env.part](input));
