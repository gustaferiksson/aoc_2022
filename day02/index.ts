import { file } from 'bun';
export const input = await file('input.txt').text();

const scoreMap = {
  'A X': 4,
  'A Y': 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6,
};

const translatedScoreMap = {
  'A X': 'A Z', // lose
  'A Y': 'A X', // draw
  'A Z': 'A Y', // win
  'B X': 'B X', // lose
  'B Y': 'B Y', // draw
  'B Z': 'B Z', // win
  'C X': 'C Y', // lose
  'C Y': 'C Z', // draw
  'C Z': 'C X', // win
};

const solution1 = (input: string): number => {
  return input
    .split('\n')
    .map(turn => scoreMap[turn])
    .reduce((a, b) => a + b);
};
const solution2 = (input: string): number => {
  return input
    .split('\n')
    .map(turn => scoreMap[translatedScoreMap[turn]])
    .reduce((a, b) => a + b);
};

export const day02 = {
  part1: (input: string) => solution1(input),
  part2: (input: string) => solution2(input),
  default: () => 'env variable part is missing',
};

console.log(day02[process.env.part || 'default'](input));
