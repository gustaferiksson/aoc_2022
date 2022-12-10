import { file } from 'bun';
import { describe, expect, it } from 'bun:test';
import { day10 } from '.';

const input = await file('input.txt').text();
// const example = await file('example.txt').text();

const result_part2_input = `
#### ###   ##  ###  #  # ####  ##  #  # 
#    #  # #  # #  # #  # #    #  # #  # 
###  #  # #    #  # #### ###  #    #### 
#    ###  # ## ###  #  # #    # ## #  # 
#    #    #  # #    #  # #    #  # #  # 
#    #     ### #    #  # #     ### #  # `;

describe('Day 10', () => {
  // it('Part 1 - Example', () => {
  //   expect(day10.part1(example)).toBe(13140);
  // });

  // it('Part 2 - Example', () => {
  //   expect(day10.part2(example2)).toBe(36);
  // });

  it('Part 1 - Input', () => {
    expect(day10.part1(input)).toBe(10760);
  });

  it('Part 2 - Input', () => {
    expect(day10.part2(input)).toBe(result_part2_input);
  });
});
