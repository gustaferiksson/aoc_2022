import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day04 } from '.';

const example = await file('example.txt').text();
const input = await file('input.txt').text();

describe('Day 04', () => {
  it('Part 1 - Example', () => {
    expect(day04.part1(example)).toBe(2);
  });

  it('Part 2 - Example', () => {
    expect(day04.part2(example)).toBe(4);
  });

  it('Part 1 - Input', () => {
    expect(day04.part1(input)).toBe(511);
  });

  it('Part 2 - Input', () => {
    expect(day04.part2(input)).toBe(821);
  });
});
