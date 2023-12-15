import * as fs from "fs";

function calc(str: string): number {
  let val = 0;

  for (let ch of str) {
    let num = ch.charCodeAt(0);
    val += num;
    val *= 17;
    val %= 256;
  }

  return val;
}

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);

  console.log("lines", lines);

  for (let line of lines) {
    let items = line.split(",");
    let sum = 0;
    for (let item of items) {
      console.log(item, calc(item));
      sum += calc(item);
    }
    console.log("sum: ", sum);
  }
}

main();
