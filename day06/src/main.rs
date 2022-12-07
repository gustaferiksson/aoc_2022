use std::collections::HashSet;
use std::env;
use std::fs;

fn marker(input: &str, count: usize) -> usize {
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
        "part1" => println!("{}", marker(&input, 4)),
        "part2" => println!("{}", marker(&input, 14)),
        _ => unimplemented!(),
    }
}
