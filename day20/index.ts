import { file } from 'bun';
export const input = await file('input.txt').text();

type Num = { value: number };

const mix = (original: Num[], times: number): Num[] => {
  const mixed = [...original];
  for (const _ of Array(times)) {
    for (const v of original) {
      const index = mixed.indexOf(v);
      const move = mixed.splice(index, 1).at(0);
      mixed.splice((index + move.value) % mixed.length, 0, move);
    }
  }
  return mixed;
};

const solution = (input: string, key = 1, times = 1) => {
  const original = input.split('\n').map(x => ({ value: +x * key } as Num));
  const mixed = mix(original, times);
  const zero = mixed.findIndex(x => x.value === 0);

  return [1000, 2000, 3000].reduce((acc, curr) => acc + mixed.at((zero + curr) % mixed.length).value, 0);
};

export const day20 = {
  part1: (input: string) => solution(input),
  part2: (input: string) => solution(input, 811589153, 10),
};

process.env.part && console.log(day20[process.env.part](input));
