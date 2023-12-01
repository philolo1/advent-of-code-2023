import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  let sum = 0;

  for (const line of lines) {
    // Process each line here
    let items = line.split("").filter((x) => "1234567890".includes(x));
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
