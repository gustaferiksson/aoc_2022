import { file } from 'bun';
export const input = await file('input.txt').text();

const add = (a: number, b: number | string) => a + Number(b);
const reverse = (a: number, b: number) => b - a;

const solution = (input: string, top = 1): number => {
  return input
    .split('\n\n')
    .map(elf => elf.split('\n'))
    .map(calories => calories.reduce(add, 0))
    .sort(reverse)
    .splice(0, top)
    .reduce(add, 0);
};

export const day01 = {
  part1: (input: string) => solution(input),
  part2: (input: string) => solution(input, 3),
  default: () => 'env variable part is missing',
};

console.log(day01[process.env.part || 'default'](input));
