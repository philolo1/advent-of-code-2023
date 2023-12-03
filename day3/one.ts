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

  function isSpecial(y: number, x: number) {
    if (x < 0 || x >= xLength) return false;
    if (y < 0 || y >= yLength) return false;
    return !"0123456789.".includes(arr[y][x]);
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

        let canAdd = false;

        if (isSpecial(y, startX - 1) || isSpecial(y, x + 1)) {
          canAdd = true;
        }

        for (let x1 = startX - 1; x1 <= x + 1; x1++) {
          if (isSpecial(y - 1, x1) || isSpecial(y + 1, x1)) {
            canAdd = true;
          }
        }
        console.log("number", number);

        if (canAdd) {
          // console.log("can add");
          sum += parseInt(number);
        } else {
          console.log("can not add");
        }
      }
    }
  }

  console.log("SUM : " + sum);
}

main();
