import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day20 } from '.';

const input = await file('input.txt').text();
const example = await file('example.txt').text();

describe('Day 20', () => {
  it('Part 1 - Example', () => {
    expect(day20.part1(example)).toBe(3);
  });

  it('Part 1 - Input', () => {
    expect(day20.part1(input)).toBe(4224);
  });

  it('Part 2 - Example', () => {
    expect(day20.part2(example)).toBe(1623178306);
  });

  it('Part 2 - Input', () => {
    expect(day20.part2(input)).toBe(861907680486);
  });
});
