import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day08 } from '.';

const example = await file('example.txt').text();
const input = await file('input.txt').text();

describe('Day 08', () => {
  it('Part 1 - Example', () => {
    expect(day08.part1(example)).toBe(21);
  });

  it('Part 2 - Example', () => {
    expect(day08.part2(example)).toBe(8);
  });

  it('Part 1 - Input', () => {
    expect(day08.part1(input)).toBe(1763);
  });

  it('Part 2 - Input', () => {
    expect(day08.part2(input)).toBe(671160);
  });
});
