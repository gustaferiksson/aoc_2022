import { file } from 'bun';
export const input = await file('input.txt').text();

type Directory = { name: string; size: number };

const getDirectories = (input: string): Directory[] => {
  const cd_list: Directory[] = [];
  const directories: Directory[] = [];

  input.split('\n').map(line => {
    if (line.startsWith('$ cd')) {
      const name = line.split(' ').at(-1);
      switch (name) {
        case '/':
          const root = { name, size: 0 };
          cd_list.push(root);
          directories.push(root);
          break;

        case '..':
          cd_list.pop();
          break;

        default:
          const new_dir = { name, size: 0 };
          cd_list.push(new_dir);
          directories.push(new_dir);
          break;
      }
    }
    if (!line.startsWith('$') && !line.startsWith('dir')) {
      const [size, _] = line.split(' ');
      cd_list.map(dir => (dir.size += +size));
    }
  });
  return directories;
};

const part1 = (input: string) => {
  return getDirectories(input)
    .filter(dir => dir.size < 100000)
    .reduce((a, b) => a + b.size, 0);
};

const part2 = (input: string) => {
  const directories = getDirectories(input);
  const free = 70000000 - directories[0].size;
  const missing = 30000000 - free;
  return directories
    .filter(dir => dir.size >= missing)
    .sort((a, b) => a.size - b.size)
    .at(0).size;
};

export const day07 = {
  part1,
  part2,
};

process.env.part && console.log(day07[process.env.part](input));
