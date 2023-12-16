import * as fs from "fs";

enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}

let X: number = 0;
let Y: number = 0;

function isValid(y: number, x: number): boolean {
    return y >= 0 && y < Y && x >= 0 && x < X;
}

function main() {
  const filePath = process.argv[2]; // Replace with the path to your file

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);

  Y = lines.length;
  X = lines[0].length;

  let dir =  Direction.Right;

  let visited: Map<string, boolean>= new Map();

  let stack = [{x: 0, y: 0 , dir: Direction.Right}];

  let counter = 0;
  let visited2: Map<string, boolean>= new Map();

  while (true ) {
      let el = stack.pop();

      if (el == undefined) {
          break;
      }

      let {x, y, dir} = el;

      let visitedKey = `${y},${x},${dir}`;

      if (visited.get(visitedKey) === true) {
          continue;
      }

      visited.set(visitedKey, true)

      if (visited2.get(`${y},${x}`) == undefined) {
          counter++;
          visited2.set(`${y},${x}`, true);
      }

      console.log("KEY : ", visitedKey);

      let val = lines[y][x];



      if (val === '.') {
          let y2 = y;
          let x2 = x;
          if (dir === Direction.Right) {
              x2++;
          } else if (dir === Direction.Left) {
              x2--;
          } else if (dir === Direction.Up) {
              y2--;
          } else { // direction down
              y2++;
          }

          if (isValid(y2, x2)) {
              stack.push({x: x2, y: y2, dir});
          }
      } else if (val === '/') {
          let newDirection = dir;
          let y2 = y;
          let x2 = x;

          if (dir === Direction.Right) {
              newDirection = Direction.Up;
              y2--;
          } else if (dir === Direction.Down) {
              newDirection = Direction.Left;
              x2--;
          } else if (dir === Direction.Left) {
              newDirection = Direction.Down;
              y2++;
          } else { // direction up
              newDirection = Direction.Right;
              x2++;
          }
          if (isValid(y2, x2)) {
              stack.push({x: x2, y: y2, dir: newDirection});
          }
      } else if (val === '\\') {
          let newDirection = dir;
          let y2 = y;
          let x2 = x;

          if (dir === Direction.Right) {
              newDirection = Direction.Down;
              y2++;
          } else if (dir === Direction.Down) {
              newDirection = Direction.Right;
              x2++;
          } else if (dir === Direction.Left) {
              newDirection = Direction.Up;
              y2--;
          } else { // direction up
              newDirection = Direction.Left;
              x2--;
          }
          if (isValid(y2, x2)) {
              stack.push({x: x2, y: y2, dir: newDirection});
          }
      } else if (val === '-') { 
          let newDirection = dir;
          let y2 = y;
          let x2 = x;

          if (dir === Direction.Right) {
              x2++;
              if (isValid(y2, x2)) {
                  stack.push({x: x2, y: y2, dir: newDirection});
              }
          } else if (dir === Direction.Left) {
              x2--;
              if (isValid(y2, x2)) {
                  stack.push({x: x2, y: y2, dir: newDirection});
              }
          } else {
              if (isValid(y, x-1)) {
                  stack.push({x: x-1, y: y, dir: Direction.Left});
              }
              if (isValid(y, x+1)) {
                  stack.push({x: x+1, y: y, dir: Direction.Right});
              }
          }
      } else if (val === '|') { 
          let newDirection = dir;
          let y2 = y;
          let x2 = x;

          if (dir === Direction.Up) {
              y2--;
              if (isValid(y2, x2)) {
                  stack.push({x: x2, y: y2, dir: newDirection});
              }
          } else if (dir === Direction.Down) {
              y2++;
              if (isValid(y2, x2)) {
                  stack.push({x: x2, y: y2, dir: newDirection});
              }
          } else {
              if (isValid(y+1, x)) {
                  stack.push({x: x, y: y+1, dir: Direction.Down});
              }
              if (isValid(y-1, x)) {
                  stack.push({x: x, y: y - 1, dir: Direction.Up});
              }
          }
      } else {
          throw new Error(`Unknown character :'${val}'`);
      }



  }

  console.log("COUNTER: ", counter);






}

main();
