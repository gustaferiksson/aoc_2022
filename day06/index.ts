import { file } from 'bun';
export const input = await file('input.txt').text();

const solution = (input: string, count: number): number => {
  return [...input].findIndex((_, i, arr) => new Set(arr.slice(i, i + count)).size == count) + count;
};

export const day06 = {
  part1: (input: string) => solution(input, 4),
  part2: (input: string) => solution(input, 14),
};

process.env.part && console.log(day06[process.env.part](input));
