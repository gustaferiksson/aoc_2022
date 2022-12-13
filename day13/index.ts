import { file } from 'bun';
export const input = await file('input.txt').text();

type packet = [] | number[] | number[][];
type pair = [packet, packet];

const compare = (a: packet, b: packet): number => {
  for (let i = 0; i < a.length && i < b.length; i++) {
    const curr_a = a.at(i);
    const curr_b = b.at(i);
    if (Number.isInteger(curr_a) && Number.isInteger(curr_b)) {
      if (curr_a !== curr_b) return (curr_a as number) - (curr_b as number);
      continue;
    }
    const next_a = Number.isInteger(curr_a) ? [curr_a] : curr_a;
    const next_b = Number.isInteger(curr_b) ? [curr_b] : curr_b;
    const cmp = compare(next_a as packet, next_b as packet);
    if (cmp !== 0) return cmp;
  }
  return a.length - b.length;
};

const part1 = (input: string) => {
  return input
    .split('\n\n')
    .map(pair => pair.split('\n').map(packet => JSON.parse(packet)))
    .map((pair, i) => (compare(...(pair as pair)) < 0 ? i + 1 : 0))
    .reduce((a, b) => a + b);
};

const part2 = (input: string) => {
  const dividers = [[[2]], [[6]]];
  const parse = input
    .replaceAll('\n\n', '\n')
    .split('\n')
    .map(packet => JSON.parse(packet))
    .concat(dividers)
    .sort((a, b) => compare(a, b));

  return dividers.map(x => parse.indexOf(x) + 1).reduce((a, b) => a * b);
};

export const day12 = {
  part1,
  part2,
};

process.env.part && console.log(day12[process.env.part](input));
