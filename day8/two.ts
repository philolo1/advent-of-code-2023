import * as fs from "fs";
import lcm from "compute-lcm";

function search(
  node: String,
  i: number,
  firstLine: string,
  distMap: Map<any, any>,
  nodeMap: Map<any, any>
) {
  // save each character as a string
  const character = firstLine[i];

  let keyValue = node + "," + i;

  if (distMap.has(keyValue)) {
    return;
  }

  distMap.set(keyValue, -1);

  if (node.endsWith("Z")) {
    distMap.set(keyValue, 0);
    return;
  }

  let nextNode = node;

  // if character is 'L'
  if (character === "L") {
    // set current node to first element of nodeMap.get(currentNode)
    nextNode = nodeMap.get(node)[0];
  } else {
    // set current node to second element of nodeMap.get(currentNode)
    nextNode = nodeMap.get(node)[1];
  }

  search(nextNode, (i + 1) % firstLine.length, firstLine, distMap, nodeMap);

  let keyValue2 = nextNode + "," + ((i + 1) % firstLine.length);

  if (distMap.get(keyValue2) !== -1) {
    distMap.set(keyValue, distMap.get(keyValue2) + 1);
  }
}

// implement goSearch
function goSearch(
  node: String,
  i: number,
  firstLine: string,
  goMap: Map<any, any>,
  nodeMap: Map<any, any>,
  steps: number
) {
  // save each character as a string
  const character = firstLine[i];

  let keyValue = node + "," + i + "," + steps;

  if (goMap.has(keyValue)) {
    return;
  }

  goMap.set(keyValue, "");

  if (steps === 0) {
    goMap.set(keyValue, node);
    return;
  }

  let nextNode = node;

  // if character is 'L'
  if (character === "L") {
    // set current node to first element of nodeMap.get(currentNode)
    nextNode = nodeMap.get(node)[0];
  } else {
    // set current node to second element of nodeMap.get(currentNode)
    nextNode = nodeMap.get(node)[1];
  }

  goSearch(
    nextNode,
    (i + 1) % firstLine.length,
    firstLine,
    goMap,
    nodeMap,
    steps - 1
  );

  let keyValue2 =
    nextNode + "," + ((i + 1) % firstLine.length) + "," + (steps - 1);

  if (goMap.get(keyValue2) !== "") {
    goMap.set(keyValue, goMap.get(keyValue2));
  }
}
function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  // save first line as a string
  const firstLine = lines[0];

  // create nodeMap
  const nodeMap = new Map();

  let startNodes: Array<String> = [];

  let nodes = [];

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

    nodes.push(node);

    // add node to startNodes if it ends with 'A'
    if (node.endsWith("A")) {
      startNodes.push(node);
    }
  }

  // print out nodeMap
  // console.log(nodeMap);

  console.log("startNodes: ", startNodes);
  console.log("Firstline length:", firstLine.length);

  let steps = 0;

  // current Node, current Line => {next z, what z}
  let distMap = new Map();

  console.log("initializing distMap");
  // iterate through nodes
  for (let node of nodes) {
    // iterate through first line
    for (let i = 0; i < firstLine.length; i++) {
      search(node, i, firstLine, distMap, nodeMap);
    }
  }

  console.log("finished initializing distMap");

  let goMap = new Map();
  for (let node of nodes) {
    // iterate through first line
    // console.log(node);
    for (let i = 0; i < firstLine.length; i++) {
      for (let steps = 0; steps <= 10; steps++) {
        goSearch(node, i, firstLine, goMap, nodeMap, steps);
      }
    }
  }

  console.log("finished initializing goMap");

  // log start node
  console.log("startNodes: ", startNodes);
  let finish = false;

  let counter = 0;
  let i = 0;

  let iteration = 0;

  console.log("finished: ", counter);

  let distances = [];
  for (let node of startNodes) {
    let d = distMap.get(node + "," + 0);
    distances.push(d);
    console.log("node: ", node, "distance: ", d);
  }

  console.log(distances);
  // calculate lcm via wolfram alpha
  console.log("solution", lcm(distances));
}

main();
