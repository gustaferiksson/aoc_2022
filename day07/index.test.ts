import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day07 } from '.';

const example = await file('example.txt').text();
const input = await file('input.txt').text();

describe('Day 07', () => {
  it('Part 1 - Example', () => {
    expect(day07.part1(example)).toBe(95437);
  });

  it('Part 2 - Example', () => {
    expect(day07.part2(example)).toBe(24933642);
  });

  it('Part 1 - Input', () => {
    expect(day07.part1(input)).toBe(1908462);
  });

  it('Part 2 - Input', () => {
    expect(day07.part2(input)).toBe(3979145);
  });
});
