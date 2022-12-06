import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day06 } from '.';

const example = await file('example.txt').text();
const input = await file('input.txt').text();

const test0 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
const test1 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
const test2 = 'nppdvjthqldpwncqszvftbrmjlhg';
const test3 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
const test4 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';

describe('Day 06', () => {
  it('Part 1 - Example', () => {
    expect(day06.part1(test1)).toBe(5);
    expect(day06.part1(test2)).toBe(6);
    expect(day06.part1(test3)).toBe(10);
    expect(day06.part1(test4)).toBe(11);
  });

  it('Part 2 - Example', () => {
    expect(day06.part2(test0)).toBe(19);
    expect(day06.part2(test1)).toBe(23);
    expect(day06.part2(test2)).toBe(23);
    expect(day06.part2(test3)).toBe(29);
    expect(day06.part2(test4)).toBe(26);
  });

  it('Part 1 - Input', () => {
    expect(day06.part1(input)).toBe(1929);
  });

  it('Part 2 - Input', () => {
    expect(day06.part2(input)).toBe(3298);
  });
});
