'use strict';

//connect  input module
const readlineSync = require('readline-sync');

//input validation function
function inputDataChecker() {
  let inputNumber = readlineSync.question(
    'How many nodes your graph will have? \n'
  );
  inputNumber = Number(inputNumber);
  if (typeof inputNumber === 'number' && inputNumber > 1) return inputNumber;
  else {
    console.log('Invalid input, please enter number above one. ');
    return inputDataChecker();
  }
}

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
  matrix = symetric(matrix);
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
    const row = new Array(dimensionOfMatrix).fill(0);
    zeroMatrix.push(row);
  }
  return zeroMatrix;
}

//Function that make symetric matrix
function symetric(inputMatrix) {
  const symetricMatrix = inputMatrix;
  for (let i = 0; i < symetricMatrix[0].length; i++) {
    for (let j = 0; j < symetricMatrix[0].length; j++) {
      if (symetricMatrix[i][j] !== symetricMatrix[j][i]) {
        symetricMatrix[i][j] = symetricMatrix[j][i];
      }
    }
  }
  return symetricMatrix;
}

//creating class of edges
class Edge {
  constructor(start, end, weight) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}

//Factory that creates edges by weight matrix
function EdgesFactory(matrixGraph) {
  const edges = [];
  for (let i = 1; i <= matrixGraph[0].length; i++) {
    for (let j = 1; j <= matrixGraph[0].length; j++) {
      const line = matrixGraph[i - 1];
      const weight = line[j - 1];
      if (weight !== 0) {
        const value = new Edge(i - 1, j - 1, weight);
        edges.push(value);
      }
    }
  }
  return edges;
}

//Function for sort by weight
function compareWeight(edgeA, edgeB) {
  return edgeA.weight - edgeB.weight;
}

//Main function in Kraskal algorithm
function baseBuilderKraskal(edges, matrixSize) {
  const baseMatrix = zerosMatrix(matrixSize);
  const passedNodes = {};
  while (Object.keys(passedNodes).length < matrixSize) {
    edges = edges.filter(() => true);
    const edge = edges.shift();
    const start = edge.start;
    const end = edge.end;
    const row = baseMatrix[start];
    row[edge.end] = 1;
    baseMatrix[start] = row;
    passedNodes[start] = 1;
    passedNodes[end] = 1;
    baseMatrix[start] = row;
    for (let i = 0; i < edges.length; i++) {
      const currentEdge = edges[i];
      const currentStart = currentEdge.start;
      const currentEnd = currentEdge.end;
      if (passedNodes[currentStart] === 1 && passedNodes[currentEnd] === 1) {
        delete edges[i];
      }
    }
  }
  return baseMatrix;
}

//Realization Kraskal algoritm
function algorithmKraskal(weightMatrix) {
  const matrixSize = weightMatrix[0].length;
  //Create edges
  const edges = EdgesFactory(weightMatrix);
  //Sort edges by weight
  edges.sort(compareWeight);
  //Find base of graph
  const baseMatrix = baseBuilderKraskal(edges, matrixSize);
  return baseMatrix;
}

//Function for finding lead time
function timeTester(matrix) {
  const start = new Date().getTime();
  const baseOfGraph = algorithmKraskal(matrix);
  const end = new Date().getTime();

  const runningTime = end - start;
  return [baseOfGraph, runningTime];
}

//Usage
const dimensionMatrix = inputDataChecker();
const dimensionBigMatrix = dimensionMatrix * 2;

const matrixGraph = getRandomSquareMatrix(dimensionMatrix);
const secondMatrix = getRandomSquareMatrix(dimensionMatrix);
const bigMatrixGraph = getRandomSquareMatrix(dimensionBigMatrix);
const bigMatrixSecondGraph = getRandomSquareMatrix(dimensionBigMatrix);

// console.log('First matrix: \n')
// console.log(firstMatrixGraph);
// console.log('Second matrix: \n')
// console.log(secondMatrix);
// console.log('First big matrix: \n')
// console.log(bigMatrixGraph);
// console.log('Second big matrix: \n')
// console.log(bigMatrixSecondGraph);

//Finding lead time
let baseMatrix,
    firstTime,
    secondBaseMatrix,
    secondTime,
    bigBaseMatrix,
    bigMatrixTime,
    secondBaseBigMatrix,
    bigMatrixSecondTime;

[baseMatrix, firstTime] = timeTester(matrixGraph);
// console.log(baseMatrix);
console.log(`Running time for first graph: ${firstTime}ms`);

[secondBaseMatrix, secondTime] = timeTester(secondMatrix);
// console.log(secondBaseMatrix);
console.log(`Running time for second graph: ${secondTime}ms`);

[bigBaseMatrix, bigMatrixTime] = timeTester(bigMatrixGraph);
// console.log(bigBaseMatrix);
console.log(`Running time for big graph: ${bigMatrixTime}ms`);

[secondBaseBigMatrix, bigMatrixSecondTime] = timeTester(bigMatrixSecondGraph);
// console.log(secondBaseBigMatrix);
console.log(`Running time for second big graph: ${bigMatrixSecondTime}ms`);
