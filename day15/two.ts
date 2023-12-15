import * as fs from "fs";

function calc(str: string): number {
  let val = 0;

  for (let ch of str) {
    let num = ch.charCodeAt(0);
    val += num;
    val *= 17;
    val %= 256;
  }

  return val;
}

type Obj = {
  label: string;
  num: number;
};

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);

  console.log("lines", lines);

  let items = lines[0].split(",");

  let box: Map<number, Obj[]> = new Map();

  for (let i = 0; i < 256; i++) {
    box.set(i, []);
  }

  console.log("items", items);

  for (let item of items) {
    if (item[item.length - 1] === "-") {
      let label = item.replace("-", "");
      console.log("LABEL", label, label.length);
      let num = calc(label);
      let arr = box.get(num) as Obj[];

      arr = arr.filter((x) => x.label != label);

      box.set(num, arr);
    } else if (item.includes("=")) {
      let [label, val] = item.split("=");
      let boxNumber = calc(label);
      let num = parseInt(val);

      let arr = box.get(boxNumber) as Obj[];

      let hasFound = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].label === label) {
          arr[i].num = num;
          hasFound = true;
          break;
        }
      }

      if (!hasFound) {
        arr.push({ label, num });
      }

      box.set(boxNumber, arr);
    } else {
      throw Error("Cannot parse :" + item);
    }
  }

  let sum = 0;
  for (let i = 0; i < 256; i++) {
    let arr = box.get(i) as Obj[];

    for (let j = 0; j < arr.length; j++) {
      sum += (i + 1) * arr[j].num * (j + 1);
    }
    //
    // if (arr.length > 0) {
    //   console.log(i, arr);
    // }
  }

  console.log("SUM", sum);
}

main();
