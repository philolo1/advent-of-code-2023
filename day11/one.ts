import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((x) => x.trim().length > 0);

  let arr: Array<Array<string>> = [];
  for (const line of lines) {
    arr.push(line.split(""));
  }

  // create type cordinates
  type Cordinates = {
    x: number;
    y: number;
  };

  let cordinateArr: Array<Cordinates> = [];

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (arr[y][x] === "#") {
        cordinateArr.push({ y, x });
      }
    }
  }

  cordinateArr = cordinateArr.sort((a, b) => {
    return a.x - b.x;
  });

  console.log("coord", cordinateArr);

  let plus = 0;
  let lastX = cordinateArr[0].x;

  for (let i = 1; i < cordinateArr.length; i++) {
    if (cordinateArr[i].x > lastX) {
      plus += cordinateArr[i].x - lastX - 1;
      lastX = cordinateArr[i].x;
    }
    cordinateArr[i].x += plus;
  }

  cordinateArr = cordinateArr.sort((a, b) => {
    return a.y - b.y;
  });

  plus = 0;
  let lastY = cordinateArr[0].y;

  for (let i = 1; i < cordinateArr.length; i++) {
    if (cordinateArr[i].y > lastY) {
      plus += cordinateArr[i].y - lastY - 1;
      lastY = cordinateArr[i].y;
    }
    cordinateArr[i].y += plus;
  }

  let sum = 0;

  for (let a = 0; a < cordinateArr.length; a++) {
    for (let b = a + 1; b < cordinateArr.length; b++) {
      sum +=
        Math.abs(cordinateArr[a].x - cordinateArr[b].x) +
        Math.abs(cordinateArr[a].y - cordinateArr[b].y);
    }
  }

  console.log("RES: ", sum);
}

main();
