import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  let sum = 0;

  for (const line of lines) {
    if (line.trim().length == 0) continue;
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

    let res = 0;

    for (let item of right.trim().split(" ")) {
      if (winning[item.trim()] >= 1) {
        winning[item.trim()]--;
        res = res == 0 ? 1 : res * 2;
      }
    }

    sum += res;

    // console.log("winning", winning);
  }
  console.log("SUM: ", sum);

  console.log("File reading finished.");
}

main();
