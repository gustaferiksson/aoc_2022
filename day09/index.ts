import { file } from 'bun';
export const input = await file('input.txt').text();

enum Direction {
  Up = 'U',
  Down = 'D',
  Left = 'L',
  Right = 'R',
}

type Motion = { direction: Direction; steps: number };
type Point = { x: number; y: number };

const distance = (p1: Point, p2: Point): number => {
  const deltaX = Math.abs(p1.x - p2.x);
  const deltaY = Math.abs(p1.y - p2.y);
  return deltaX + deltaY - Math.min(deltaX, deltaY);
};

const move_in_direction = (point: Point, direction: Direction): Point => {
  if (direction == Direction.Up) point.y++;
  if (direction == Direction.Down) point.y--;
  if (direction == Direction.Left) point.x--;
  if (direction == Direction.Right) point.x++;
  return point;
};

const follow = (head: Point, tail: Point) => {
  if (distance(head, tail) >= 2) {
    if (head.x !== tail.x) head.x > tail.x ? tail.x++ : tail.x--;
    if (head.y !== tail.y) head.y > tail.y ? tail.y++ : tail.y--;
  }
  return tail;
};

const solution = (input: string, length: number) => {
  const knots: Point[] = new Array(length).fill(null).map((_): Point => ({ x: 0, y: 0 }));

  const visited: string[] = [];

  visited.push(JSON.stringify(knots.at(0)));

  const motions: Motion[] = input
    .split('\n')
    .map(motion => motion.split(' '))
    .map(([direction, steps]): Motion => ({ direction: direction as Direction, steps: +steps }));

  for (const { direction, steps } of motions) {
    for (const _ of Array(steps)) {
      move_in_direction(knots.at(0), direction);

      for (const [index, knot] of knots.slice(1).entries()) {
        follow(knots.at(index), knot);
      }
      visited.push(JSON.stringify(knots.at(-1)));
    }
  }
  return new Set(visited).size;
};

export const day09 = {
  part1: (input: string) => solution(input, 2),
  part2: (input: string) => solution(input, 10),
};

process.env.part && console.log(day09[process.env.part](input));
