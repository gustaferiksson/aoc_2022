import { file } from 'bun';
export const input = await file('input.txt').text();

class Monkey {
  items: number[];
  operation: Function;
  test: Function;
  count = 0;

  // todo: create proper monkey parser

  constructor(items: number[], operation: (item: number) => number, test: (item: number) => number) {
    this.items = items;
    this.operation = operation;
    this.test = test;
  }

  throw(): [number, number] {
    this.count++;
    const firstItem = this.items.shift();
    // const worryLevel = Math.floor(this.operation(firstItem) / 3);
    const worryLevel = this.operation(firstItem);
    return [this.test(worryLevel), worryLevel];
  }

  catch(item: number) {
    this.items.push(item);
  }
}

const part1 = (input: string): number => {
  const monkey0 = new Monkey(
    [89, 84, 88, 78, 70],
    x => x * 5,
    x => (!(x % 7) ? 6 : 7)
  );
  const monkey1 = new Monkey(
    [76, 62, 61, 54, 69, 60, 85],
    x => x + 1,
    x => (!(x % 17) ? 0 : 6)
  );
  const monkey2 = new Monkey(
    [83, 89, 53],
    x => x + 8,
    x => (!(x % 11) ? 5 : 3)
  );
  const monkey3 = new Monkey(
    [95, 94, 85, 57],
    x => x + 4,
    x => (!(x % 13) ? 0 : 1)
  );
  const monkey4 = new Monkey(
    [82, 98],
    x => x + 7,
    x => (!(x % 19) ? 5 : 2)
  );
  const monkey5 = new Monkey(
    [69],
    x => x + 2,
    x => (!(x % 2) ? 1 : 3)
  );
  const monkey6 = new Monkey(
    [82, 70, 58, 87, 59, 99, 92, 65],
    x => x * 11,
    x => (!(x % 5) ? 7 : 4)
  );
  const monkey7 = new Monkey(
    [91, 53, 96, 98, 68, 82],
    x => x * x,
    x => (!(x % 3) ? 4 : 2)
  );

  const monkeys = [monkey0, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7];
  const divisible_multiple = 7 * 17 * 11 * 13 * 19 * 2 * 5 * 3;
  for (const _ of Array(10000)) {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        const [to, item] = monkey.throw();
        monkeys.at(to).catch(item % divisible_multiple);
      }
    }
  }
  console.log(monkeys);
  monkeys.sort((a, b) => b.count - a.count);
  return monkeys.at(0).count * monkeys.at(1).count;
};

// const part2 = (input: string): string => {};

export const day11 = {
  part1,
  // part2,
};

process.env.part && console.log(day11[process.env.part](input));
