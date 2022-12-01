import { file } from 'bun';
const input = await file('input.txt').text();

const solution = (input: string, top = 1): number => {
  return input
    .split('\n\n')
    .map(x => x.split('\n'))
    .map(x => x.reduce((a, b) => a + Number(b), 0))
    .sort((a, b) => b - a)
    .splice(0, top)
    .reduce((a, b) => a + b);
};

export const part1 = (input: string) => solution(input, 1);
export const part2 = (input: string) => solution(input, 3);

console.log(process.env.part === 'part1' ? part1(input) : part2(input));
