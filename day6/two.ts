import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const [timeLine, distLine] = fileContent.split("\n");

  let time = parseInt(
    timeLine
      .split(":")[1]
      .split(" ")
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .join(""),
  );

  let dist = parseInt(
    distLine
      .split(":")[1]
      .split(" ")
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .join(""),
  );

  console.log("times", time, dist);

  let counter = 0;

  for (let t = 0; t <= time; t++) {
    let amount = (time - t) * t;
    if (dist < amount) {
      counter++;
    }
  }

  console.log("counter", counter);
}

main();
