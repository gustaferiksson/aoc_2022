use std::{collections::HashSet, env, fs};

fn marker(input: String, count: usize) -> usize {
    return input
        .chars()
        .collect::<Vec<char>>()
        .windows(count)
        .enumerate()
        .position(|(_i, slice)| {
            let set = slice.iter().collect::<HashSet<&char>>();
            return set.len() == slice.len();
        })
        .unwrap()
        + count;
}

fn main() {
    let input = fs::read_to_string("input.txt").unwrap();

    let part = env::var("part").unwrap_or("part1".to_string());

    match part.as_str() {
        "part1" => println!("{}", marker(input, 4)),
        "part2" => println!("{}", marker(input, 14)),
        _ => unimplemented!(),
    }
}
