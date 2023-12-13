import * as fs from "fs";

function isVertical(
  x: number,
  X: number,
  Y: number,
  lines: Array<string>,
): boolean {
  for (let y = 0; y < Y; y++) {
    let x1 = x - 1;
    let x2 = x;

    while (x1 >= 0 && x2 < X) {
      if (lines[y][x1] != lines[y][x2]) {
        return false;
      }
      x1--;
      x2++;
    }
  }
  return true;
}

function isHorizontal(
  y: number,
  X: number,
  Y: number,
  lines: Array<string>,
): boolean {
  for (let x = 0; x < X; x++) {
    let y1 = y - 1;
    let y2 = y;

    while (y1 >= 0 && y2 < Y) {
      if (lines[y1][x] != lines[y2][x]) {
        return false;
      }
      y1--;
      y2++;
    }
  }
  return true;
}

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fields = fileContent.split("\n\n");

  let rows = 0;
  let columns = 0;

  for (let f of fields) {
    console.log("Field: ", f);
    let lines = f
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);

    console.log("lines", lines);

    let Y = lines.length;
    let X = lines[0].length;

    // 0 .. x -1  | x ... X - 1
    for (let x = 1; x < X; x++) {
      if (isVertical(x, X, Y, lines)) {
        console.log("found vertical", x);
        columns += x;
        break;
      }
    }

    // 0 .. y -1  | y ... Y - 1
    for (let y = 1; y < Y; y++) {
      if (isHorizontal(y, X, Y, lines)) {
        console.log("found horizontal", y);
        rows += y;
        break;
      }
    }
  }

  console.log("res: ", rows * 100 + columns);
}

main();
