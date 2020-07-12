//Depth First Search Algorithm
const visitedNodesInOrder = [];
let found = 0;
export function getdfspath(board, startNode, finishNode) {
  startNode.isVisited = true;
  depthfirstsearch(board, startNode, finishNode);
  return visitedNodesInOrder;
}
function depthfirstsearch(board, startNode, finishNode) {
  if (startNode === finishNode) {
    visitedNodesInOrder.push(startNode);
    found = 1;
    return 1;
  }

  if (startNode.isWall || found) return 0;

  const neigbhors = getUnvisitedNeighbors(startNode, board);

  visitedNodesInOrder.push(startNode);
  for (const neighbor of neigbhors) {
    if (!neighbor.isVisited) {
      neighbor.isVisited = true;
      neighbor.previousNode = startNode;
      if (depthfirstsearch(board, neighbor, finishNode)) {
        break;
      }
    }
  }

  return 0;
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
