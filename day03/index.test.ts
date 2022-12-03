import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day03 } from '.';

const example = await file('example.txt').text();
const input = await file('input.txt').text();

describe('Day 03', () => {
  it('Part 1 - Example', () => {
    expect(day03.part1(example)).toBe(157);
  });

  it('Part 2 - Example', () => {
    expect(day03.part2(example)).toBe(70);
  });

  it('Part 1 - Input', () => {
    expect(day03.part1(input)).toBe(7821);
  });

  it('Part 2 - Input', () => {
    expect(day03.part2(input)).toBe(2752);
  });
});
