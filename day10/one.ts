import * as fs from "fs";

interface Coordinates {
  y: number;
  x: number;
}

interface StackInfo extends Coordinates {
  len: number;
}

function findStart(board: Array<Array<string>>): Coordinates {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === "S") {
        return { y, x };
      }
    }
  }
  throw new Error("S not found");
}

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((x) => x.trim().length > 0);

  let board: Array<Array<string>> = [];

  for (let line of lines) {
    board.push(line.split(""));
  }

  // console.log("board", board);

  let Y = lines.length;
  let X = board[0].length;

  let start = findStart(board);

  let visited = new Map<string, boolean>();

  let stack: Array<StackInfo> = [];

  {
    let x = start.x;
    let y = start.y;

    if (y + 1 < Y && "|LJ".includes(board[y + 1][x])) {
      stack.push({ y: y + 1, x: x, len: 1 });
    }

    if (y - 1 >= 0 && "|7F".includes(board[y - 1][x])) {
      stack.push({ y: y - 1, x: x, len: 1 });
    }

    if (x - 1 >= 0 && "-LF".includes(board[y][x - 1])) {
      stack.push({ y: y, x: x - 1, len: 1 });
    }

    if (x + 1 < X && "-7J".includes(board[y][x + 1])) {
      stack.push({ y: y, x: x + 1, len: 1 });
    }
  }

  console.log("stack", stack);

  visited.set(`${start.y},${start.x}`, true);

  let result = 1;

  while (true) {
    let el = stack.shift();
    // console.log("el", el);
    if (el == null) {
      break;
    }

    let { x, y, len } = el;

    let mapKey = `${el.y},${el.x}`;

    if (visited.get(mapKey) === true) {
      //   console.log("visited");
      continue;
    }

    visited.set(mapKey, true);

    // TODO bound checks

    if (el.len > result) {
      result = el.len;
    }

    let item = board[el.y][el.x];

    if (item === "|") {
      stack.push({ y: y + 1, x: x, len: len + 1 });
      stack.push({ y: y - 1, x: x, len: len + 1 });
    } else if (item === "-") {
      stack.push({ y: y, x: x + 1, len: len + 1 });
      stack.push({ y: y, x: x - 1, len: len + 1 });
    } else if (item === "L") {
      stack.push({ y: y - 1, x: x, len: len + 1 });
      stack.push({ y: y, x: x + 1, len: len + 1 });
    } else if (item === "J") {
      stack.push({ y: y - 1, x: x, len: len + 1 });
      stack.push({ y: y, x: x - 1, len: len + 1 });
    } else if (item === "7") {
      stack.push({ y: y, x: x - 1, len: len + 1 });
      stack.push({ y: y + 1, x: x, len: len + 1 });
    } else if (item === "F") {
      stack.push({ y: y, x: x + 1, len: len + 1 });
      stack.push({ y: y + 1, x: x, len: len + 1 });
    }
  }

  console.log("result", result);
}

main();
