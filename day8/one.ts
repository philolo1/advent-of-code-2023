import * as fs from "fs";

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  // save first line as a string
  const firstLine = lines[0];

  // create nodeMap
  const nodeMap = new Map();

  // loop for 3 rd line to last line
  for (let i = 2; i < lines.length; i++) {
    // save each line as a string
    const line = lines[i];

    // parse input of the form HGK = (LRV, NBJ)
    const [node, children] = line.split(" = ");
    const childrenArray = children
      .replace("(", "")
      .replace(")", "")
      .split(", ");

    // add node to nodeMap with children
    nodeMap.set(node, childrenArray);
  }

  // print out nodeMap
  console.log(nodeMap);

  // create current node and set to 'AAA'
  let currentNode = "AAA";

  let i = 0;
  let steps = 0;
  // iterate through first line
  while (currentNode !== "ZZZ") {
    // save each character as a string
    const character = firstLine[i];

    // if character is 'L'
    if (character === "L") {
      // set current node to first element of nodeMap.get(currentNode)
      currentNode = nodeMap.get(currentNode)[0];
    } else {
      // set current node to second element of nodeMap.get(currentNode)
      currentNode = nodeMap.get(currentNode)[1];
    }

    steps++;

    i = i + 1;
    i %= firstLine.length;
  }

  console.log("steps: ", steps);
}

main();
