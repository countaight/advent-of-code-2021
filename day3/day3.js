const input = require('./input.js');
// let gamma = [];
// let epsilon = [];
// for (let i = 0; i < input[0].length; i++) {
//   const zeroes = input.map((bin) => bin[i]).filter((bin) => bin === '0' ).length;
//   const ones = input.map((bin) => bin[i]).filter((bin) => bin === '1').length;

//   if (zeroes > ones) {
//     gamma.push('0');
//     epsilon.push('1');
//   } else {
//     gamma.push('1');
//     epsilon.push('0');
//   }
// };

// parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);

const filterByCommon = (arry, cursor) => {
  if (arry.length < 2 || cursor === 12) {
    return arry;
  }

  let common;
  const zeroes = arry.map((bin) => bin[cursor]).filter((bin) => bin === "0").length;
  const ones = arry.map((bin) => bin[cursor]).filter((bin) => bin === "1").length;

  if (zeroes > ones) {
    common = '0'
  } else {
    common = '1'
  }
  return filterByCommon(arry.filter((bin) => bin[cursor] === common), cursor + 1);
};

const filterByUncommon = (arry, cursor) => {
  if (arry.length < 2 || cursor === 12) {
    return arry;
  }

  console.log(arry);
  let uncommon;
  const zeroes = arry
    .map((bin) => bin[cursor])
    .filter((bin) => bin === "0").length;
  const ones = arry
    .map((bin) => bin[cursor])
    .filter((bin) => bin === "1").length;

  if (zeroes <= ones) {
    uncommon = '0';
  } else {
    uncommon = '1';
  }

  console.log(uncommon);
  return filterByUncommon(
    arry.filter((bin) => bin[cursor] === uncommon),
    cursor + 1
  );
};

const gamma = filterByCommon(input, 0);
const epsilon = filterByUncommon(input, 0);

console.log(parseInt(gamma[0], 2) * parseInt(epsilon[0], 2));