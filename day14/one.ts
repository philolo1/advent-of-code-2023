import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);

  const Y = lines.length;
  const X = lines[0].length;

  let sum = 0;
  for (let x = 0; x < X; x++) {
    let y = 0;
    let col = 0;
    while (y < Y) {
      let VAL = Y - y;
      while (y < Y && "O.".includes(lines[y][x])) {
        if ("O" === lines[y][x]) {
          col += VAL;
          VAL--;
        }
        y++;
      }
      y++;
    }
    console.log("Col", col);
    sum += col;
  }

  console.log("SUM", sum);
}

main();
