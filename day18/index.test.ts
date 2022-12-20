import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day18 } from '.';

const input = await file('input.txt').text();
const example = await file('example.txt').text();

describe('Day 18', () => {
  it('Part 1 - Example', () => {
    expect(day18.part1(example)).toBe(64);
  });

  it('Part 1 - Input', () => {
    expect(day18.part1(input)).toBe(4580);
  });

  it('Part 2 - Example', () => {
    expect(day18.part2(example)).toBe(58);
  });

  it('Part 2 - Input', () => {
    expect(day18.part2(input)).toBe(2610);
  });
});
