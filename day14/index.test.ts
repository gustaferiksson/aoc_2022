import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day14 } from '.';

const input = await file('input.txt').text();
const example = await file('example.txt').text();

describe('Day 14', () => {
  it('Part 1 - Example', () => {
    expect(day14.part1(example)).toBe(24);
  });

  it('Part 1 - Input', () => {
    expect(day14.part1(input)).toBe(672);
  });

  it('Part 2 - Example', () => {
    expect(day14.part2(example)).toBe(93);
  });

  it('Part 2 - Input', () => {
    expect(day14.part2(input)).toBe(26831);
  });
});
