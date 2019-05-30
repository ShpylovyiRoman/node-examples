'use strict';

//connect  input module
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

//Usage
const dimensionOfMatrix = readlineSync.question(
  'How many nodes your graph will have? \n'
);

const matrixGraph = getRandomSquareMatrix(dimensionOfMatrix);

const A = algorithmKraskal(matrixGraph);
console.log(matrixGraph);
console.log(A);
