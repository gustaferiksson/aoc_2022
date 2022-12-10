import { file } from 'bun';
export const input = await file('input.txt').text();

type Cycles = number[];
type Crt = ('#' | ' ')[];
enum Op {
  noop = 'noop',
  addx = 'addx',
}

const get_cycles = (input: string): Cycles => {
  let v = 1;
  const cycles = [];

  for (const line of input.split('\n')) {
    const [op, value] = line.split(' ');

    if (op == Op.noop) cycles.push(v);
    if (op == Op.addx) {
      cycles.push(v);
      cycles.push(v);
      v += +value;
    }
  }
  return cycles;
};

const get_crt = (cycles: Cycles): Crt => {
  return cycles.map((value, i) => {
    const sprite = i % 40;
    return sprite >= value - 1 && sprite <= value + 1 ? '#' : ' ';
  });
};

const crt_to_image = (crt: Crt): string => {
  return crt.reduce((acc, curr, i) => (i % 40 === 0 ? `${acc}\n${curr}` : `${acc}${curr}`), '');
};

const part1 = (input: string): number => {
  const cycles = get_cycles(input);

  return [20, 60, 100, 140, 180, 220].reduce((acc, curr) => acc + curr * cycles[curr - 1], 0);
};

const part2 = (input: string): string => {
  const cycles = get_cycles(input);
  const crt = get_crt(cycles);

  return crt_to_image(crt);
};

export const day10 = {
  part1,
  part2,
};

process.env.part && console.log(day10[process.env.part](input));
