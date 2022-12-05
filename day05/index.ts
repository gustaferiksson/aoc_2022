import { file } from 'bun';
import './array.extension';

export const input = await file('input.txt').text();

type Stacks = string[][];
type Move = { amount: number; from: number; to: number };

const getTopCrates = (stacks: Stacks) => stacks.map(array => array.slice(0, 1)).join('');

const parseMoves = (string: string): Move[] => {
  return string
    .split('\n')
    .map(line => line.split(' '))
    .map(splits => {
      return { amount: +splits[1], from: +splits[3] - 1, to: +splits[5] - 1 };
    });
};

const parseStacks = (string: string): Stacks => {
  return string
    .split('\n')
    .map(row => [...row])
    .transpose()
    .map(row => row.join('').replace(/[\[\]\d\s]/g, ''))
    .filter(x => x.length)
    .map(stack => [...stack]);
};

const crateMover = (input: string, version = 9000): string => {
  const [stacks_raw, moves_raw] = input.split('\n\n');

  const stacks = parseStacks(stacks_raw);
  const moves = parseMoves(moves_raw);

  moves.forEach(({ amount, from, to }) => {
    const crates = stacks[from].splice(0, amount);
    if (version === 9000) crates.reverse();
    stacks[to].unshift(...crates);
  });

  return getTopCrates(stacks);
};

export const day05 = {
  part1: (input: string) => crateMover(input, 9000),
  part2: (input: string) => crateMover(input, 9001),
};

process.env.part && console.log(day05[process.env.part](input));
