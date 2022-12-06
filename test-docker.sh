for dir in ./day*; do
    docker build $dir -t ${dir##*/}
done

for dir in ./day*; do
    echo "\n${dir##*/}"
    docker run -e part=part1 ${dir##*/}
    docker run -e part=part2 ${dir##*/}
done