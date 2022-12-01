import { describe, expect, it } from 'bun:test';
import { part1, part2 } from '.';

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
  it('Part 1', () => {
    expect(part1(example)).toBe(24000);
  });

  it('Part 2', () => {
    expect(part2(example)).toBe(45000);
  });
});
