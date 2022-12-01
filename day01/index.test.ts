import { describe, expect, it } from 'bun:test';
import { input, day01 } from '.';

const example = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

describe('Day 01', () => {
  it('Part 1 - Example', () => {
    expect(day01.part1(example)).toBe(24000);
  });

  it('Part 2 - Example', () => {
    expect(day01.part2(example)).toBe(45000);
  });

  it('Part 1 - Input', () => {
    expect(day01.part1(input)).toBe(68775);
  });

  it('Part 2 - Input', () => {
    expect(day01.part2(input)).toBe(202585);
  });
});
