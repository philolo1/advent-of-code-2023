import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((x) => x.trim().length > 0);

  let sum = 0;

  for (let line of lines) {
    let items = line
      .split(" ")
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .map((x) => parseInt(x))
      .reverse();

    let newArr = [];
    newArr.push(items);

    let index = 0;

    while (true) {
      let arr = [];

      // check if all values of array are equal
      let allEqual = newArr[index].every((val, i, arr) => val === arr[0]);

      if (allEqual) {
        break;
      }

      for (let i = 0; i < newArr[index].length - 1; i++) {
        arr.push(newArr[index][i + 1] - newArr[index][i]);
      }

      newArr.push(arr);
      index++;
    }

    newArr[index].push(newArr[index][newArr[index].length - 1]);
    console.log(newArr);

    for (let i = index - 1; i >= 0; i--) {
      newArr[i].push(
        newArr[i][newArr[i].length - 1] +
          newArr[i + 1][newArr[i + 1].length - 1],
      );
    }

    console.log("items", items);

    console.log("newArr", newArr[0]);

    sum += newArr[0][newArr[0].length - 1];
  }

  console.log("SUM", sum);
}

main();
