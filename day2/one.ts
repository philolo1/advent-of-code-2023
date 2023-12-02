import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  let sum = 0;

  let counter = 0;
  for (const line of lines) {
    counter++;
    // Process each line here
    let newLine = line.substring(line.indexOf(":") + 1).trim();
    if (newLine.length == 0) {
      continue;
    }
    // console.log("newLine", newLine);
    let items = newLine.trim().split(";");

    let possible = true;

    for (let item of items) {
      let colors = item.split(",");
      // console.log("colors", colors);

      for (let col of colors) {
        let data = col.trim().split(" ");
        let number = parseInt(data[0]);
        let c = data[1];

        // console.log("parse: ", number, "color: ", c);
        if (c.trim() === "red" && number > 12) {
          possible = false;
          break;
        }

        if (c.trim() === "blue" && number > 14) {
          possible = false;
          break;
        }

        if (c.trim() === "green" && number > 13) {
          possible = false;
          break;
        }
      }
    }

    if (possible) {
      console.log("possible: ", counter);
      sum += counter;
    }
  }

  console.log("File reading finished.");
  console.log("sum: ", sum);
}

main();
