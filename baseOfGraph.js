'use strict';

//connect module input
const readlineSync = require('readline-sync');

//Getting a matrix with random data
function getRandomSquareMatrix(dimensionOfMatrix) {
  let matrix = [];
  for (let i = 0; i < dimensionOfMatrix; i++) {
    const row = [];
    for (let j = 0; j < dimensionOfMatrix; j++) {
      const random = getRandom(10, 99);
      row.push(random);
    }
    matrix.push(row);
  }
  matrix = zeroDiagonal(matrix);
  return matrix;
}

//Function that give random number from 10 to 99
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Function that puts zeros diagonally
function zeroDiagonal(matrix) {
  const newMatrix = matrix;
  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (i === j) {
        const currentRow = newMatrix[i];
        currentRow[j] = 0;
        newMatrix[i] = currentRow;
      }
    }
  }
  return newMatrix;
}

//Function that creates matrix filled 0
function zerosMatrix(dimensionOfMatrix) {
  const zeroMatrix = [];
  for (let i = 0; i < dimensionOfMatrix; i++) {
    const row = [];
    for (let j = 0; j < dimensionOfMatrix; j++) {
      row.push(0);
    }
    zeroMatrix.push(row);
  }
  return zeroMatrix;
}

//Function that change all numbers, expect 0, to 1
function toOnesMatrix(baseMatrix) {
  for (let i = 0; i < baseMatrix[0].length; i++) {
    for (let j = 0; j < baseMatrix[0].length; j++) {
      if (baseMatrix[i][j] !== 0) {
        baseMatrix[i][j] = 1;
      }
    }
  }
  return baseMatrix;
}

//Function that find minimal way to next node
function minSelect(weightMatr, currentMatrix, currentNode, passedNodes) {
  let nextNode;
  const baseMatrix = currentMatrix;
  let minValue = Infinity;
  for (let i = 0; i < weightMatr[0].length; i++) {
    if (passedNodes[i] !== 1) {
      if (weightMatr[currentNode][i] < minValue) {
        minValue = weightMatr[currentNode][i];
        baseMatrix[currentNode] = new Array(weightMatr[0].length).fill(0);
        baseMatrix[currentNode][i] = minValue;
        nextNode = i;
      }
    }
  }
  return [baseMatrix, nextNode];
}

//Main function to find base of graph
function baseGraphFinder(weightMatrix, startNode) {
  let baseMatrix = zerosMatrix(weightMatrix[0].length);
  const passedNodes = [];
  let currentNode = startNode;

  for (let i = 1; i < weightMatrix[0].length; i++) {
    [baseMatrix] = minSelect(
      weightMatrix,
      baseMatrix,
      currentNode,
      passedNodes
    );
    passedNodes[currentNode] = 1;
    [, currentNode] = minSelect(
      weightMatrix,
      baseMatrix,
      currentNode,
      passedNodes
    );
  }
  baseMatrix = toOnesMatrix(baseMatrix);
  return baseMatrix;
}

//Usage

//input dimension of matrix and start node
const dimensionOfMatrix = readlineSync.question(
  'How many nodes your graph will have? \n'
);
const startNode = getRandom(0, dimensionOfMatrix);

//Set matrix of weighted graph
const matrixGraph = getRandomSquareMatrix(dimensionOfMatrix);

//Output of weighted graph
console.log('\nMatrix of weighted graph: ');
console.log(matrixGraph);

console.log('\nStart node is : ' + startNode + '\n');

console.log(baseGraphFinder(matrixGraph, startNode));
