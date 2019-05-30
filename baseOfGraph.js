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
    let row = new Array(dimensionOfMatrix).fill(0);
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

//Function that make symetric matrix
function symetric(inputMatrix){
  let symetricMatrix = inputMatrix;
  for (let i = 0; i < symetricMatrix[0].length; i++) {
    for (let j = 0; j < symetricMatrix[0].length; j++) {
      if (symetricMatrix[i][j] !== symetricMatrix[j][i]) {
        symetricMatrix[i][j] = symetricMatrix[j][i];
      }
    }
  }
  return symetricMatrix
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
function EdgesFactory(matrixGraph){
let edges=[];
for (let i=1; i<=(matrixGraph[0].length); i++){
  let line = matrixGraph[i-1];
  for (let j=1; j<=(matrixGraph[0].length); j++){
    let line = matrixGraph[i-1];
    let weight = line[j-1];
    if (weight !== 0){
      let value=new Edge(i-1, j-1, weight);
      edges.push(value);
      }
    }
  }
  return edges
}

//Function for sort by weight
function compareWeight(edgeA, edgeB) {
  return edgeA.weight - edgeB.weight;
}


//Main function in Kraskal algorithm
function KraskalBaseBuilder(edges, matrixSize){
  let baseMatrix = zerosMatrix(matrixSize);
  let passedNodes = {};
  while (Object.keys(passedNodes).length < matrixSize){
  edges = edges.filter(function () { return true });
    let edge = edges.shift();
    let start = edge.start;
    let end = edge.end;
    let row = baseMatrix[start];
    row[edge.end]=1;
    baseMatrix[start]=row;
    passedNodes[start]=1;
    passedNodes[end]=1;
    baseMatrix[start]=row;
    for (let i=0; i<edges.length; i++){
      let currentEdge = edges[i];
      let currentStart = currentEdge.start;
      let currentEnd = currentEdge.end;
      if (passedNodes[currentStart]===1 && passedNodes[currentEnd] ===1){
        delete  edges[i]
      }
    }
  }
  return baseMatrix;
}


//Realization Kraskal algoritm
function KraskalAlgorithm(weightMatrix){
    let matrixSize = weightMatrix[0].length;
//Create edges
    const edges=EdgesFactory(weightMatrix)
//Sort edges by weight
  edges.sort(compareWeight)
//Find base of graph
  let baseMatrix = KraskalBaseBuilder(edges, matrixSize)
  return baseMatrix
}


//Usage
const dimensionOfMatrix = readlineSync.question(
  'How many nodes your graph will have? \n'
);

const matrixGraph = getRandomSquareMatrix(dimensionOfMatrix);




const A = KraskalAlgorithm(matrixGraph);
console.log(matrixGraph)
console.log(A)