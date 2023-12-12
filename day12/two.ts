import * as fs from "fs";

function calcDamage(
  leftPos: number,
  rightPos: number,
  str: string,
  arr: Array<number>,
  res: Map<string, number>,
): number {
  if (rightPos === arr.length) {
    return 0;
  }

  if (leftPos + arr[rightPos] > str.length) {
    return 0;
  }

  for (let x = 0; x < arr[rightPos]; x++) {
    if (str[leftPos + x] === ".") {
      return 0;
    }
  }

  if (leftPos + arr[rightPos] == str.length) {
    return calc(leftPos + arr[rightPos], rightPos + 1, str, arr, res);
  }

  if (
    str[leftPos + arr[rightPos]] == "?" ||
    str[leftPos + arr[rightPos]] == "."
  ) {
    return calc(leftPos + arr[rightPos] + 1, rightPos + 1, str, arr, res);
  } else {
    return 0;
  }
}

function calc(
  leftPos: number,
  rightPos: number,
  str: string,
  arr: Array<number>,
  res: Map<string, number>,
): number {
  let keyVal = `${leftPos},${rightPos}`;

  let el = res.get(keyVal);

  if (el != null) {
    return el;
  }

  if (leftPos == str.length) {
    if (rightPos == arr.length) {
      // console.log("ONE");
      return 1;
    } else {
      return 0;
    }
  }

  if (leftPos > str.length) {
    return 0;
  }

  let sol1 = 0;
  let sol2 = 0;

  if (str[leftPos] === "." || str[leftPos] === "?") {
    sol1 = calc(leftPos + 1, rightPos, str, arr, res);
  }

  if (str[leftPos] === "#" || str[leftPos] === "?") {
    sol2 = calcDamage(leftPos, rightPos, str, arr, res);
  }

  res.set(keyVal, sol1 + sol2);
  return sol1 + sol2;
}

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((x) => x.trim().length > 0);

  let sum = 0;
  for (let line of lines) {
    let [input, numbersStr] = line.split(" ");
    let numbers = numbersStr.split(",").map((x) => parseInt(x));

    console.log("data", input, numbers);
    let res = new Map<string, number>();

    let newStr = input;
    for (let i = 0; i < 4; i++) {
      newStr += "?" + input;
    }
    let newArr = numbers;
    for (let i = 0; i < 4; i++) {
      newArr = [...newArr, ...numbers];
    }

    let val = calc(0, 0, newStr, newArr, res);
    console.log("RES: ", val);
    sum += val;
    // console.log("RS", res);
  }

  console.log("SUM: ", sum);
}

main();
