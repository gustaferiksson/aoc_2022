import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day11 } from '.';

const input = await file('input.txt').text();
const example = await file('example.txt').text();

describe('Day 11', () => {
  it('Part 1 - Example', () => {
    expect(day11.part1(example)).toBe(10605);
  });

  // it('Part 2 - Example', () => {
  //   expect(day11.part2(example2)).toBe(36);
  // });

  // it('Part 1 - Input', () => {
  //   expect(day11.part1(input)).toBe(11760);
  // });

  // it('Part 2 - Input', () => {
  //   expect(day11.part2(input)).toBe(result_part2_input);
  // });
});
