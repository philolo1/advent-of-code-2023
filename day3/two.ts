import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  let sum = 0;

  let arr: Array<Array<string>> = [];

  for (const line of lines) {
    // Process each line here
    let items = line.split("");
    if (items.length > 0) {
      arr.push(items);
    }
  }

  console.log("File reading finished.");
  console.log(arr);
  console.log("SUM: " + sum);

  let yLength = arr.length;
  let xLength = arr[0].length;

  type StarValuesType = {
    [key: number]: {
      [key: number]: number[];
    };
  };

  const starValues: StarValuesType = {};

  function addNumber(y: number, x: number, num: number) {
    if (x < 0 || x >= xLength) return;
    if (y < 0 || y >= yLength) return;
    if ("*" === arr[y][x]) {
      starValues[y][x].push(num);
    }
  }

  for (let y = 0; y < arr.length; y++) {
    starValues[y] = {};
    for (let x = 0; x < arr[y].length; x++) {
      starValues[y][x] = [];
    }
  }

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if ("0123456789".includes(arr[y][x])) {
        let startX = x;
        let number = arr[y][x];

        while (x + 1 < arr[y].length && "0123456789".includes(arr[y][x + 1])) {
          number += arr[y][x + 1];
          x++;
        }

        let myNumber = parseInt(number);

        addNumber(y, startX - 1, myNumber);
        addNumber(y, x + 1, myNumber);

        for (let x1 = startX - 1; x1 <= x + 1; x1++) {
          addNumber(y - 1, x1, myNumber);
          addNumber(y + 1, x1, myNumber);
        }
      }
    }
  }

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (starValues[y][x].length == 2) {
        console.log("add", starValues[y][x][0], starValues[y][x][1]);
        sum += starValues[y][x][0] * starValues[y][x][1];
      }
    }
  }

  console.log("SUM : " + sum);
}

main();
