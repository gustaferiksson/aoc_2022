use std::collections::HashSet;
use std::env;
use std::fs;

fn find_marker(input: &str, count: usize) -> usize {
    let index = input
        .chars()
        .collect::<Vec<char>>()
        .windows(count)
        .position(|slice| {
            let set = slice.iter().collect::<HashSet<&char>>();
            return set.len() == slice.len();
        })
        .unwrap();

    return index + count;
}

fn main() {
    let input = fs::read_to_string("input.txt").unwrap();

    let part = env::var("part").unwrap_or("part1".to_string());

    match part.as_str() {
        "part1" => println!("{}", find_marker(&input, 4)),
        "part2" => println!("{}", find_marker(&input, 14)),
        _ => unimplemented!(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    const EXAMPLE1: &str = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
    const EXAMPLE2: &str = "bvwbjplbgvbhsrlpgdmjqwftvncz";
    const EXAMPLE3: &str = "nppdvjthqldpwncqszvftbrmjlhg";
    const EXAMPLE4: &str = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
    const EXAMPLE5: &str = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

    #[test]
    fn part1_example() {
        assert_eq!(find_marker(&EXAMPLE1, 4), 7);
        assert_eq!(find_marker(&EXAMPLE2, 4), 5);
        assert_eq!(find_marker(&EXAMPLE3, 4), 6);
        assert_eq!(find_marker(&EXAMPLE4, 4), 10);
        assert_eq!(find_marker(&EXAMPLE5, 4), 11);
    }
    #[test]
    fn part2_example() {
        assert_eq!(find_marker(&EXAMPLE1, 14), 19);
        assert_eq!(find_marker(&EXAMPLE2, 14), 23);
        assert_eq!(find_marker(&EXAMPLE3, 14), 23);
        assert_eq!(find_marker(&EXAMPLE4, 14), 29);
        assert_eq!(find_marker(&EXAMPLE5, 14), 26);
    }
}
