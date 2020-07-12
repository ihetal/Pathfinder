// Breadth First Search Algorithm Implementation
export function getbfspath(board, startNode, finishNode) {
  let visitedNodesInOrder = [];
  let queue = [];
  startNode.isVisited = true;
  queue.push(startNode);
  while (queue.length !== 0) {
    let element = queue.shift();

    if (element.isWall) continue;
    visitedNodesInOrder.push(element);
    if (element === finishNode) return visitedNodesInOrder;
    const neighbors = getUnvisitedNeighbors(element, board);

    neighbors.forEach((neighbor) => {
      neighbor.previousNode = element;
      neighbor.isVisited = true;
      queue.push(neighbor);
    });
  }
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(vertex, board) {
  const { row, col } = vertex;
  const neighbors = [];
  if (row > 0) neighbors.push(board[row - 1][col]);
  if (row < board.length - 1) neighbors.push(board[row + 1][col]);
  if (col > 0) neighbors.push(board[row][col - 1]);
  if (col < board[0].length - 1) neighbors.push(board[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
