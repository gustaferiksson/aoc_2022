import { file } from 'bun';
export const input = await file('input.txt').text();

type Forest = number[][];
type Tree = { x: number; y: number; height: number };

const is_tree_visible = ({ x, y, height }: Tree, forest: Forest): boolean => {
  const forest_width = forest.at(0).length;
  const forest_height = forest.length;

  if (x == 0) return true;
  if (y == 0) return true;
  if (x == forest_width - 1) return true;
  if (y == forest_height - 1) return true;

  const up = forest.slice(0, y).map(n => n.at(x));
  const down = forest.slice(y + 1).map(n => n.at(x));
  const left = forest.at(y).slice(0, x);
  const right = forest.at(y).slice(x + 1);

  if (up.every(t => t < height)) return true;
  if (down.every(t => t < height)) return true;
  if (left.every(t => t < height)) return true;
  if (right.every(t => t < height)) return true;

  return false;
};

const get_scenic_score = ({ x, y, height }: Tree, forest: Forest) => {
  const up = forest.slice(0, y).map(n => n.at(x));
  const down = forest.slice(y + 1).map(n => n.at(x));
  const left = forest.at(y).slice(0, x);
  const right = forest.at(y).slice(x + 1);

  const score_up = up.reverse().findIndex(t => t >= height) + 1 || up.length;
  const score_down = down.findIndex(t => t >= height) + 1 || down.length;
  const score_left = left.reverse().findIndex(t => t >= height) + 1 || left.length;
  const score_right = right.findIndex(t => t >= height) + 1 || right.length;

  return score_up * score_down * score_left * score_right;
};

const part1 = (input: string) => {
  const forest: Forest = input.split('\n').map(line => line.split('').map(x => +x));

  return forest
    .map((row, y, forest) => row.map((height, x) => +is_tree_visible({ x, y, height }, forest)))
    .flat()
    .reduce((a, b) => a + b);
};

const part2 = (input: string) => {
  const forest: Forest = input.split('\n').map(line => line.split('').map(x => +x));

  return forest
    .map((row, y, forest) => row.map((height, x) => get_scenic_score({ x, y, height }, forest)))
    .flat()
    .sort((a, b) => b - a)
    .at(0);
};

export const day08 = {
  part1,
  part2,
};

process.env.part && console.log(day08[process.env.part](input));
