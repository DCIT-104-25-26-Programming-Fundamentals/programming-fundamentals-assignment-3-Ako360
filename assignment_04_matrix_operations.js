// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, columns, matrixLabel) {
  const matrix = [];

  for (let row = 1; row <= rows; row++) {
    const line = readlineSync.question(`Enter ${matrixLabel} row ${row}: `);
    const values = line.split(' ').map(Number);

    if (values.length !== columns || values.some(Number.isNaN)) {
      console.log('Error: Each row must contain exactly ' + columns + ' numbers.');
      process.exit(1);
    }

    matrix.push(values);
  }

  return matrix;
}

function displayMatrix(matrix, title) {
  if (title) {
    console.log(title);
  }

  for (let row = 0; row < matrix.length; row++) {
    const rowValues = matrix[row].map((value) => String(value).padStart(4, ' '));
    console.log(rowValues.join(''));
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];

  for (let col = 0; col < cols; col++) {
    const newRow = [];
    for (let row = 0; row < rows; row++) {
      newRow.push(matrix[row][col]);
    }
    transposed.push(newRow);
  }

  return transposed;
}

function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const result = [];

  for (let row = 0; row < rows; row++) {
    const newRow = [];
    for (let col = 0; col < cols; col++) {
      newRow.push(matrixA[row][col] + matrixB[row][col]);
    }
    result.push(newRow);
  }

  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result = [];

  for (let row = 0; row < rowsA; row++) {
    const newRow = [];
    for (let col = 0; col < colsB; col++) {
      let cellValue = 0;
      for (let k = 0; k < colsA; k++) {
        cellValue += matrixA[row][k] * matrixB[k][col];
      }
      newRow.push(cellValue);
    }
    result.push(newRow);
  }

  return result;
}

function main() {
  console.log('--- Part A: Transpose a Matrix ---');
  const rowsA = readlineSync.questionInt('Enter number of rows: ');
  const colsA = readlineSync.questionInt('Enter number of columns: ');

  if (rowsA <= 0 || colsA <= 0) {
    console.log('Error: Number of rows and columns must be positive.');
    return;
  }

  const matrixA = readMatrix(rowsA, colsA, 'matrix A');
  console.log('\nOriginal Matrix:');
  displayMatrix(matrixA);

  const transposed = transposeMatrix(matrixA);
  console.log('\nTransposed Matrix:');
  displayMatrix(transposed);

  console.log('\n--- Part B: Add Two Matrices ---');
  const rowsB = readlineSync.questionInt('Enter number of rows for matrix A: ');
  const colsB = readlineSync.questionInt('Enter number of columns for matrix A: ');

  if (rowsB <= 0 || colsB <= 0) {
    console.log('Error: Number of rows and columns must be positive.');
    return;
  }

  const matrixB = readMatrix(rowsB, colsB, 'matrix A');

  const rowsC = readlineSync.questionInt('Enter number of rows for matrix B: ');
  const colsC = readlineSync.questionInt('Enter number of columns for matrix B: ');

  if (rowsC !== rowsB || colsC !== colsB) {
    console.log('Error: Both matrices must have the same dimensions for addition.');
    return;
  }

  const matrixC = readMatrix(rowsC, colsC, 'matrix B');
  const sumMatrix = addMatrices(matrixB, matrixC);

  console.log('\nSum of matrices:');
  displayMatrix(sumMatrix);

  console.log('\n--- Part C: Multiply Two Matrices ---');
  const rowsD = readlineSync.questionInt('Enter number of rows for matrix A: ');
  const colsD = readlineSync.questionInt('Enter number of columns for matrix A: ');
  const matrixD = readMatrix(rowsD, colsD, 'matrix A');

  const rowsE = readlineSync.questionInt('Enter number of rows for matrix B: ');
  const colsE = readlineSync.questionInt('Enter number of columns for matrix B: ');

  if (colsD !== rowsE) {
    console.log('Error: Number of columns in matrix A must equal number of rows in matrix B.');
    return;
  }

  const matrixE = readMatrix(rowsE, colsE, 'matrix B');
  const productMatrix = multiplyMatrices(matrixD, matrixE);

  console.log('\nProduct of matrices:');
  displayMatrix(productMatrix);
}

main();

