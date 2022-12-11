import { file } from 'bun';
export const input = await file('input.txt').text();

enum Operator {
  add = '+',
  multiply = '*',
}

interface Monkey {
  id: number;
  items: number[];
  operation: {
    operator: Operator;
    value: string;
  };
  divisor: number;
  test_true: number;
  test_false: number;
  count: number;
}

const parseMonkey = (monkey_raw: string): Monkey => {
  const [index, starting, op, test, if_true, if_false] = monkey_raw.split('\n').map(line => line.trim());

  const id = +index.split('').at(-2);
  const items = starting.match(/\d+/g).map(x => +x);
  const operation = { operator: op.split(' ').at(-2) as Operator, value: op.split(' ').at(-1) };
  const divisor = +test.split(' ').at(-1);
  const test_true = +if_true.split(' ').at(-1);
  const test_false = +if_false.split(' ').at(-1);
  const count = 0;
  return { id, items, operation, divisor, test_true, test_false, count };
};

const solution = (input: string, rounds = 20): number => {
  const monkeys = input.split('\n\n').map(parseMonkey);

  const common_divisor = monkeys.reduce((acc, curr) => acc * curr.divisor, 1);

  for (const _ of Array(rounds)) {
    for (const monkey of monkeys) {
      const { items, operation, divisor, test_true, test_false } = monkey;
      while (items.length) {
        const old = items.shift();
        const value = operation.value === 'old' ? old : +operation.value;
        const worryLevel = operation.operator === Operator.add ? old + value : old * value;
        const worryLevelAfterInspect = rounds === 20 ? Math.floor(worryLevel / 3) : worryLevel % common_divisor;
        monkey.count++;
        monkeys.at(worryLevelAfterInspect % divisor === 0 ? test_true : test_false).items.push(worryLevelAfterInspect);
      }
    }
  }
  monkeys.sort((a, b) => b.count - a.count);
  return monkeys.at(0).count * monkeys.at(1).count;
};

export const day11 = {
  part1: (input: string) => solution(input),
  part2: (input: string) => solution(input, 10000),
};

process.env.part && console.log(day11[process.env.part](input));
