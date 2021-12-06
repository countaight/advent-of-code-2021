const input = require('./input.js')

const startingPoint = [0, 0];

const position = {
  hor: 0,
  aim: 0,
  depth: 0
}

const move = (dir) => {
  const inst = dir.split(' ');

  if (inst[0] === 'forward') {
    position.hor += Number(inst[1]);
    position.depth += Number(inst[1]) * position.aim
  }

  if (inst[0] === 'down') {
    position.aim += Number(inst[1]);
  }

  if (inst[0] === 'up') {
    position.aim -= Number(inst[1]);
  }
}

input.forEach((val) => move(val));

console.log(position.hor * position.depth);

