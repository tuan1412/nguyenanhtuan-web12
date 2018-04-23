'use strict'

function generate(testLengthArray) {
  let result = [];
  if (testLengthArray.length < 4) {
    for (let i = 0; i < testLengthArray.length; i++) {
      result.push(generateRandomIndex(testLengthArray[i]));
    }
  }else {
    result.push(generateNotFound(testLengthArray[0]));
    result.push(generateFirstIndex(testLengthArray[1]));
    result.push(generateMiddleIndex(testLengthArray[2]));
    result.push(generateLastIndex(testLengthArray[3]));
    for (let i = 4; i < testLengthArray.length; i++) {
      result.push(generateRandomIndex(testLengthArray[i]));
    }
  }
  return result;
}

function generateInput(length) {
  const minFirst = -1000;
  const maxFisrt = 1000;
  const maxDelta = 1000;
  let input = [];
  for (let i = 0; i < length; i++) {
    if (i == 0) {
      input[i] = getRandomInt(minFirst, maxFisrt);
    }else {
      let delta = getRandomInt(1, maxDelta)
      input[i] = input[i - 1] + delta;
    }
  }
  return input;
}

function generateNotFound(length) {
  const input = generateInput(length);
  const output = -1;
  let target = input[0] + 1;
  for (let i = 0; i < length; i++){
    if (input[i] + 1 < input[i+1]){
      target = Math.floor((input[i] + input[i+1]) / 2);
      break;
    }
  }

  return {
    input: input,
    target: target,
    output: output
  };
}

function generateFirstIndex(length) {
  const input = generateInput(length);
  const target = input[0];
  const output = 0;
  return {
    input: input,
    target: target,
    output: output
  };
}

function generateLastIndex(length) {
  const input = generateInput(length);
  const output = length - 1;
  const target = input[output];
  return {
    input: input,
    target: target,
    output: output
  };
}

function generateMiddleIndex(length) {
  const input = generateInput(length);
  const output = getRandomInt(1, length - 2)
  const target = input[output];
  return {
    input: input,
    target: target,
    output: output
  };
}

function generateRandomIndex(length) {
  const input = generateInput(length);
  const output = getRandomInt(0, length - 1)
  const target = input[output];
  return {
    input: input,
    target: target,
    output: output
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generate
