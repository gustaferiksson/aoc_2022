import { file } from 'bun';
export const input = await file('input.txt').text();

enum Op {
  noop = 'noop',
  addx = 'addx',
}

const part1 = (input: string) => {
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

  return [20, 60, 100, 140, 180, 220].reduce((acc, curr) => acc + curr * cycles[curr - 1], 0);
};

const part2 = (input: string) => {
  let v = 1;
  const cycles = [];
  const crt = [];

  for (const line of input.split('\n')) {
    const [op, value] = line.split(' ');

    if (op == Op.noop) cycles.push(v);
    if (op == Op.addx) {
      cycles.push(v);
      cycles.push(v);
      v += +value;
    }
  }

  for (const [i, value] of cycles.entries()) {
    const sprite = i % 40;
    if (sprite >= value - 1 && sprite <= value + 1) crt.push('#');
    else crt.push(' ');
  }

  let row = '';
  for (const [i, pixel] of crt.entries()) {
    if (i % 40 === 0) row = `${row}\n`;
    row = `${row}${pixel}`;
  }
  return row;
  // console.log(crt);
};

export const day10 = {
  part1,
  part2,
};

process.env.part && console.log(day10[process.env.part](input));
