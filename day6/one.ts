import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const [timeLine, distLine] = fileContent.split("\n");

  let times = timeLine
    .split(":")[1]
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .map((x) => parseInt(x));

  let distances = distLine
    .split(":")[1]
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .map((x) => parseInt(x));

  console.log("times", times, distances);

  let prod = 1;

  for (let i = 0; i < times.length; i++) {
    let time = times[i];
    let dist = distances[i];

    let counter = 0;

    for (let t = 0; t <= time; t++) {
      let amount = (time - t) * t;
      if (dist < amount) {
        counter++;
      }
    }

    console.log("counter", counter);

    prod *= counter;
  }

  console.log("prod", prod);
}

main();
