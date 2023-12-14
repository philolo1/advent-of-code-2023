import * as fs from "fs";

let X: number;
let Y: number;
let lines: string[][];

function print() {
  // return;
  // for (let y = 0; y < Y; y++) {
  //   console.log(lines[y].join(""));
  // }
}

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  lines = fileContent
    .split("\n")
    .map((x) => x.trim().split(""))
    .filter((x) => x.length > 0);

  Y = lines.length;
  X = lines[0].length;

  print();

  let myMap: Map<number, Array<number>> = new Map();

  let loadArr: number[] = [];

  for (let circle = 0; circle <= 1000; circle++) {
    // console.log("\n GRAPH: NORTH");
    // north
    for (let x = 0; x < X; x++) {
      let y = 0;
      while (y < Y) {
        let pos = y;
        let counter = 0;
        while (y < Y && "O.".includes(lines[y][x])) {
          if ("O" === lines[y][x]) {
            counter++;
          }
          lines[y][x] = ".";
          y++;
        }
        counter--;
        while (counter >= 0) {
          lines[pos + counter][x] = "O";
          counter--;
        }
        y++;
      }
    }
    print();

    // console.log("GRAPH WEST");
    for (let y = 0; y < Y; y++) {
      let x = 0;
      while (x < X) {
        let pos = x;
        let counter = 0;
        while (x < X && "O.".includes(lines[y][x])) {
          if ("O" === lines[y][x]) {
            counter++;
          }
          lines[y][x] = ".";
          x++;
        }
        counter--;
        while (counter >= 0) {
          lines[y][pos + counter] = "O";
          counter--;
        }
        x++;
      }
    }

    print();

    // console.log("\n GRAPH: SOUTH");
    // north
    for (let x = 0; x < X; x++) {
      let y = Y - 1;
      while (y >= 0) {
        let pos = y;
        let counter = 0;
        while (y >= 0 && "O.".includes(lines[y][x])) {
          if ("O" === lines[y][x]) {
            counter++;
          }
          lines[y][x] = ".";
          y--;
        }
        counter--;
        while (counter >= 0) {
          lines[pos - counter][x] = "O";
          counter--;
        }
        y--;
      }
    }
    print();

    // console.log("\n GRAPH EAST");
    for (let y = 0; y < Y; y++) {
      let x = X - 1;
      while (x >= 0) {
        let pos = x;
        let counter = 0;
        while (x >= 0 && "O.".includes(lines[y][x])) {
          if ("O" === lines[y][x]) {
            counter++;
          }
          lines[y][x] = ".";
          x--;
        }
        counter--;
        while (counter >= 0) {
          lines[y][pos - counter] = "O";
          counter--;
        }
        x--;
      }
    }

    print();

    let load = 0;
    for (let y = 0; y < Y; y++) {
      for (let x = 0; x < X; x++) {
        if (lines[y][x] == "O") {
          load += Y - y;
        }
      }
    }
    console.log(circle, load);

    if (circle > 500) {
      if (myMap.get(load) == null) {
        myMap.set(load, [circle]);
      } else {
        let val = myMap.get(load) as number[];
        val.push(circle);
        myMap.set(load, val);
      }
    }

    loadArr.push(load);
  }

  let myArr = myMap.get(loadArr[loadArr.length - 1]) as number[];
  let circleLength = myArr[myArr.length - 1] - myArr[myArr.length - 2];

  console.log("circleLength: ", circleLength);
  console.log(
    "a: ",
    loadArr[loadArr.length - 1],
    loadArr[loadArr.length - 1 - circleLength],
  );

  console.log(
    "a: ",
    loadArr[loadArr.length - 4],
    loadArr[loadArr.length - 4 - circleLength],
  );

  let result = (1_000_000_000 - loadArr.length - circleLength) % circleLength;

  console.log("RES: ", loadArr[loadArr.length - 1 - circleLength + result]);

  // 14
  //
}

main();
