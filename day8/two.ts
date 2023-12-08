import * as fs from "fs";

let valueMap: { [key: string]: number } = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
};

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  let newArr = [];

  for (let line of lines) {
    if (line.trim().length === 0) continue;
    let [hand, number] = line.split(" ");

    let values = [];

    for (let ch of hand) {
      values.push(valueMap[ch]);
    }

    console.log(line, values, number);

    let numberMap: { [key: number]: number } = {};

    let jNumber = 0;
    for (let v of values) {
      if (v === 1) {
        jNumber++;
      } else if (numberMap[v] == null) {
        numberMap[v] = 1;
      } else {
        numberMap[v]++;
      }
    }

    let arr = [];

    for (let i = 0; i <= 15; i++) {
      if (numberMap[i] != null) {
        arr.push(numberMap[i]);
      }
    }

    arr = arr.sort((a, b) => a - b);

    let kind = -1;

    if (arr.length === 1 || arr.length === 0) {
      // five equal
      kind = 7;
    } else if (arr.length === 2 && arr[1] + jNumber === 4) {
      // four equal
      kind = 6;
    } else if (arr.length === 2) {
      // full house
      kind = 5;
    } else if (arr.length === 3 && arr[2] + jNumber === 3) {
      // three of kind
      kind = 4;
    } else if (arr.length === 3) {
      // two pair
      kind = 3;
    } else if (arr.length === 4) {
      kind = 2;
    } else {
      kind = 1;
    }

    console.log("arr", arr);

    newArr.push({
      kind: kind,
      hand: hand,
      number: parseInt(number),
      values: values,
    });
  }

  newArr = newArr.sort((a, b) => {
    if (a.kind != b.kind) {
      return a.kind - b.kind;
    }

    for (let i = 0; i < 5; i++) {
      if (a.values[i] != b.values[i]) {
        return a.values[i] - b.values[i];
      }
    }

    return 0;
  });

  console.log("newArr", newArr);

  let res = 0;
  for (let i = 0; i < newArr.length; i++) {
    res += (i + 1) * newArr[i].number;
  }

  console.log("res", res);
}

main();
