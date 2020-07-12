let wallstoanimate = [];
export function recursive(
  board,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  surroundingWalls
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    wallstoanimate = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (
          (row === 0 ||
            col === 0 ||
            row === board.length - 1 ||
            col === board[0].length - 1) &&
          !board[row][col].isStart &&
          !board[row][col].isFinish
        ) {
          board[row][col].isWall = true;
          wallstoanimate.push(board[row][col]);
        }
      }
    }
    surroundingWalls = true;
  }

  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    let currentCol = colStart - 1;
    while (currentCol <= colEnd + 1) {
      if (
        currentCol !== colRandom &&
        !board[currentRow][currentCol].isStart &&
        !board[currentRow][currentCol].isFinish
      ) {
        board[currentRow][currentCol].isWall = true;
        wallstoanimate.push(board[currentRow][currentCol]);
      }
      currentCol++;
    }

    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursive(
        board,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls
      );
    } else {
      recursive(
        board,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursive(
        board,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls
      );
    } else {
      recursive(
        board,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    let currentRow = rowStart - 1;
    while (currentRow <= rowEnd + 1) {
      if (
        currentRow !== rowRandom &&
        !board[currentRow][currentCol].isStart &&
        !board[currentRow][currentCol].isFinish
      ) {
        board[currentRow][currentCol].isWall = true;
        wallstoanimate.push(board[currentRow][currentCol]);
      }
      currentRow++;
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursive(
        board,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls
      );
    } else {
      recursive(
        board,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursive(
        board,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls
      );
    } else {
      recursive(
        board,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls
      );
    }
  }
  return wallstoanimate;
}
