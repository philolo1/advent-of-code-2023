import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  let sum = 0;

  let names = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  for (const line of lines) {
    // Process each line here
    let items = [];
    for (let i = 0; i < line.length; i++) {
      if ("123456789".includes(line[i])) {
        items.push(line[i]);
      }

      for (let j = 0; j < names.length; j++) {
        let word = line.substring(i, i + names[j].length);
        if (word === names[j]) {
          console.log("true", word);
          items.push(`${j + 1}`);
        }
      }
    }

    if (items.length > 0) {
      let num = items[0] + items[items.length - 1];
      console.log("val: ", num, items);
      let val = parseInt(num);
      sum += val;
    }

    console.log("SUM: ", sum);
  }

  console.log("File reading finished.");
}

main();
