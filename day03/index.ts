import { file } from 'bun';
export const input = await file('input.txt').text();

const add = (a: number, b: number) => a + b;

const toPriority = (char: string): number => {
  const isLowercase = char.toLowerCase() === char;
  const charCode = char.charCodeAt(0);

  return isLowercase ? charCode - 96 : charCode - 38;
};

const part1 = (input: string): number => {
  return input
    .split('\n')
    .map(rucksack => {
      const first = rucksack.slice(0, rucksack.length / 2);
      const second = rucksack.slice(rucksack.length / 2);
      return [...first].find(item => [...second].includes(item));
    })
    .map(toPriority)
    .reduce(add);
};

const part2 = (input: string): number => {
  const rucksacks = input.split('\n');
  const groups = [...Array(rucksacks.length / 3)].map(_ => rucksacks.splice(0, 3)); // yikes

  return groups
    .map(([first, second, third]) => {
      return [...first].find(item => [...second].includes(item) && [...third].includes(item));
    })
    .map(toPriority)
    .reduce(add);
};

export const day03 = {
  part1,
  part2,
};

process.env.part && console.log(day03[process.env.part](input));
