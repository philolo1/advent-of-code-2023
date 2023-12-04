import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((e) => e.length > 0);

  let sum = 0;

  let amount: Array<number> = [];

  for (let index = 0; index < lines.length; index++) {
    amount[index] = 1;
  }

  for (let index = 0; index < lines.length; index++) {
    let line = lines[index];

    // Process each line here
    let cardLine = line.split(":")[1].trim();
    let [left, right] = cardLine.split("|");

    // console.log("left: ", left, "right: ", right);

    const winning: { [key: string]: number } = {};

    for (let item of left.trim().split(" ")) {
      if (item.trim().length == 0) {
        continue;
      }
      if (winning[item.trim()] == undefined) {
        winning[item.trim()] = 1;
      } else {
        console.log("found", item.trim(), " help", line);
        winning[item.trim()]++;
      }
    }

    let count = 0;

    for (let item of right.trim().split(" ")) {
      if (winning[item.trim()] >= 1) {
        winning[item.trim()]--;
        count++;
      }
    }

    while (count > 0) {
      amount[(index + count) as number] += amount[index];
      count--;
    }

    sum += amount[index];

    // console.log("winning", winning);
  }
  console.log("SUM: ", sum);

  console.log("File reading finished.");
}

main();
