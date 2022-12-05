import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day05 } from '.';

const example = await file('example.txt').text();
const input = await file('input.txt').text();

describe('Day 05', () => {
  it('Part 1 - Example', () => {
    expect(day05.part1(example)).toBe('CMZ');
  });

  it('Part 2 - Example', () => {
    expect(day05.part2(example)).toBe('MCD');
  });

  it('Part 1 - Input', () => {
    expect(day05.part1(input)).toBe('TDCHVHJTG');
  });

  it('Part 2 - Input', () => {
    expect(day05.part2(input)).toBe('NGCMPJLHV');
  });
});
