import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day13 } from '.';

const input = await file('input.txt').text();
const example = await file('example.txt').text();

describe('Day 13', () => {
  it('Part 1 - Example', () => {
    expect(day13.part1(example)).toBe(13);
  });

  it('Part 1 - Input', () => {
    expect(day13.part1(input)).toBe(6656);
  });

  it('Part 2 - Example', () => {
    expect(day13.part2(example)).toBe(140);
  });

  it('Part 2 - Input', () => {
    expect(day13.part2(input)).toBe(19716);
  });
});
