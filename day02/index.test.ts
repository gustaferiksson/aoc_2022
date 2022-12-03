import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day02 } from '.';

const example = await file('example.txt').text();
const input = await file('input.txt').text();

describe('Day 02', () => {
  it('Part 1 - Example', () => {
    expect(day02.part1(example)).toBe(15);
  });

  it('Part 2 - Example', () => {
    expect(day02.part2(example)).toBe(12);
  });

  it('Part 1 - Input', () => {
    expect(day02.part1(input)).toBe(11150);
  });

  it('Part 2 - Input', () => {
    expect(day02.part2(input)).toBe(8295);
  });
});
