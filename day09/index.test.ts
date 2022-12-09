import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day09 } from '.';

const input = await file('input.txt').text();
const example1 = await file('example1.txt').text();
const example2 = await file('example2.txt').text();

describe('Day 09', () => {
  it('Part 1 - Example', () => {
    expect(day09.part1(example1)).toBe(13);
  });

  it('Part 2 - Example', () => {
    expect(day09.part2(example2)).toBe(36);
  });

  it('Part 1 - Input', () => {
    expect(day09.part1(input)).toBe(6236);
  });

  it('Part 2 - Input', () => {
    expect(day09.part2(input)).toBe(2449);
  });
});
