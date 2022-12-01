import { file } from 'bun';
const input = await file('input.txt').text();

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

const part = {
  part1: () => solution(input),
  part2: () => solution(input, 3),
};

console.log(part[process.env.part]());
