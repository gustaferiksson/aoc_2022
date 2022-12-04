import { file } from 'bun';
export const input = await file('example.txt').text();

const add = (a: number, b: number) => a + b;

type Range = { from: number; to: number };

const fullOverlap = (a: Range, b: Range) => {
  const c1 = a.from >= b.from && a.to <= b.to;
  const c2 = b.from >= a.from && b.to <= a.to;
  return c1 || c2 ? 1 : 0;
};

const partialOverlap = (a: Range, b: Range) => {
  const c1 = a.from >= b.from && a.from <= b.to;
  const c2 = b.from >= a.from && b.from <= a.to;
  return c1 || c2 ? 1 : 0;
};

const toRange = (s: string) => {
  const [from, to] = s.split('-').map(Number);
  return { from, to };
};

const solution = (input: string, comparator: Function): any => {
  return input
    .split('\n')
    .map(row => row.split(','))
    .map(pair => pair.map(toRange))
    .map(([a, b]) => comparator(a, b))
    .reduce(add);
};

export const day04 = {
  part1: (input: string) => solution(input, fullOverlap),
  part2: (input: string) => solution(input, partialOverlap),
};

process.env.part && console.log(day04[process.env.part](input));
