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

  console.log("File reading finished.");

  lineIndex += 2;

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

    console.log("ranges", ranges);

    // console.log("ranges", ranges);

    for (let i = 0; i < seeds.length; i++) {
      let seed = seeds[i];
      for (let item of ranges) {
        if (item.src + item.range < item.src) {
          console.log("strange", item.src + item.range < item.src);
        }
        if (item.src <= seed && seed <= item.src + item.range) {
          seeds[i] = item.dest + (seed - item.src);
        }
      }
    }

    console.log("seeds", seeds);

    index++;
    lineIndex = index;
  }

  console.log(
    "seeds",
    seeds.sort((a, b) => a - b),
  );
}

main();
