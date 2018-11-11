'use strict';

const x1 = 3, y1 = 5, r1 = 5;
const x2 = 4, y2 = 8, r2 = 7;

const x3 = x2 - x1;
const y3 = y2 - y1;

const sum = Math.sqrt(Math.pow(x3, 2) + Math.pow(y3, 2));

const sumr = r1 + r2;

if (x1 === x2, y1 === y2, r1 === r2) {
  console.log('бесконечное множество точок пересичения');
}

if (sum < sumr) {
  console.log('2 точки пересичения');
}
if (sum > sumr) {
  console.log('точок пересичения нет');
}
if (sum === sumr) {
  console.log('1 точка пересичения');
}