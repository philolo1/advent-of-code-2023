import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  let lineIndex = 0;

  let firstLine = lines[lineIndex];

  let seeds = firstLine
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x.trim()));

  console.log("initial seeds", seeds);

  let seedRanges: Array<{ start: number; end: number }> = [];

  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push({
      start: seeds[i],
      end: seeds[i] + seeds[i + 1] - 1,
    });
  }

  console.log("File reading finished.");

  lineIndex += 2;

  console.log("seedRanges", seedRanges);

  while (lineIndex < lines.length) {
    if (!lines[lineIndex].includes("map")) {
      console.log(lines[lineIndex]);
      throw Error("should contain map");
    }
    lineIndex++;
    let index = lineIndex;

    let ranges: Array<{ dest: number; src: number; range: number }> = [];
    while (index < lines.length && lines[index].length > 0) {
      let [dest, src, range] = lines[index].split(" ").map((x) => parseInt(x));

      ranges.push({
        dest,
        src,
        range: range - 1,
      });
      index++;
    }

    ranges = ranges.sort((a, b) => a.src - b.src);

    let addRanges = [];

    let start = 0;

    for (let i = 0; i < ranges.length; i++) {
      if (start < ranges[i].src) {
        addRanges.push({
          dest: start,
          src: start,
          range: ranges[i].src - start - 1,
        });
      }
      start = ranges[i].src + ranges[i].range + 1;
    }

    addRanges.push({
      dest: start,
      src: start,
      range: 7_000_000_000 - start,
    });

    for (let r of addRanges) {
      ranges.push(r);
    }

    ranges = ranges.sort((a, b) => a.src - b.src);

    console.log("ranges", ranges);

    // console.log("ranges", ranges);
    let newRanges: typeof seedRanges = [];

    while (seedRanges.length > 0) {
      let newRange = seedRanges.pop();

      if (newRange == undefined) {
        continue;
      }

      for (let item of ranges) {
        let start = Math.max(item.src, newRange.start);
        let end = Math.min(item.src + item.range, newRange.end);

        if (start <= end) {
          let destStart = item.dest + (start - item.src);
          let destEnd = item.dest + (end - item.src);
          newRanges.push({
            start: destStart,
            end: destEnd,
          });
        }
      }
    }

    seedRanges = newRanges;

    console.log("seedRanges", seedRanges);

    index++;
    lineIndex = index;
  }

  console.log(
    "seedRanges sol",
    seedRanges.sort((a, b) => a.start - b.start),
  );

  console.log("seedRanges", seedRanges.sort((a, b) => a.start - b.start)[0]);
}

main();
