'use strict'

function sort(input) {
  if (input.length <= 1) {
    return input;
  }
  const middle = Math.floor(input.length / 2);
  const left = input.slice(0, middle);
  const right = input.slice(middle);
  return merge(sort(left), sort(right));
}

function merge(left, right) {
  let output = [];
  let indexLeft = 0;
  let indexRight = 0;
  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      output.push(left[indexLeft]);
      indexLeft++;
    } else {
      output.push(right[indexRight]);
      indexRight++;
    }
  }
  return output.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}



module.exports = sort
