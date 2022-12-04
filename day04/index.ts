import { file } from 'bun';
export const input = await file('input.txt').text();

const add = (a: number, b: number) => a + b;

type Range = [string, string];

const fullOverlap = ([from1, to1]: Range, [from2, to2]: Range) => {
  return (+from1 >= +from2 && +to1 <= +to2) || (+from2 >= +from1 && +to2 <= +to1) ? 1 : 0;
};

const partialOverlap = ([from1, to1]: Range, [from2, to2]: Range) => {
  return (+from1 >= +from2 && +from1 <= +to2) || (+from2 >= +from1 && +from2 <= +to1) ? 1 : 0;
};

const solution = (input: string, comparator: Function): number => {
  return input
    .split('\n')
    .map(row => row.split(','))
    .map(pair => pair.map(range => range.split('-')))
    .map(([range1, range2]) => comparator(range1, range2))
    .reduce(add);
};

export const day04 = {
  part1: (input: string) => solution(input, fullOverlap),
  part2: (input: string) => solution(input, partialOverlap),
  default: () => 'env variable part is missing',
};

process.env.part && console.log(day04[process.env.part](input));
