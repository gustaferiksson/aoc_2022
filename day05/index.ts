import { file } from 'bun';
export const input = await file('input.txt').text();

type Move = { qty: number; from: number; to: number };

const getTop = (matrix: string[][]) => matrix.map(array => array.slice(0, 1)).join('');

const transpose = (matrix: string[][]) => {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
};

const parseInput = (input: string) => {
  const [map, moves] = input.split('\n\n');

  return {
    crates: parseMap(map),
    moves: moves.split('\n').map(parseMove),
  };
};

const parseMap = (map: string) => {
  const matrix = map
    .replace(/\[|\]|\d/g, ' ')
    .split('\n')
    .map(row => [...row]);

  return transpose(matrix)
    .map(x => x.filter(y => y != ' '))
    .filter(x => x.length);
};

const parseMove = (move: string): Move => {
  const splits = move.split(' ');
  return {
    qty: +splits[1],
    from: +splits[3] - 1,
    to: +splits[5] - 1,
  };
};

const solution = (input: string, reverse = true): any => {
  const { crates, moves } = parseInput(input);

  moves.map(({ qty, from, to }) => {
    const moveCrates = crates[from].splice(0, qty);
    if (reverse) moveCrates.reverse();
    crates[to].unshift(...moveCrates);
  });

  return getTop(crates);
};

export const day05 = {
  part1: (input: string) => solution(input),
  part2: (input: string) => solution(input, false),
};

process.env.part && console.log(day05[process.env.part](input));
