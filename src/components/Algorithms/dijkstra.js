import PriorityQueue from "../Datastructures/PriorityQueue";

// Dijkstra's Algorithm Implementation
export function dijkstra(board, startNode, finishNode) {
  console.log("In dijkstra", startNode, board);
  let visitedNodesInOrder = [];
  let pq = new PriorityQueue();
  startNode.distance = 0;
  startNode.isVisited = true;
  pq.enqueue(startNode, startNode.distance);
  while (!pq.isEmpty()) {
    let { element } = pq.dequeue();

    if (element.isWall) continue;
    if (element.distance === Infinity) return visitedNodesInOrder;
    visitedNodesInOrder.push(element);
    if (element === finishNode) return visitedNodesInOrder;
    const neighbors = getUnvisitedNeighbors(element, board);

    neighbors.forEach((neighbor) => {
      neighbor.distance = element.distance + 1;
      neighbor.previousNode = element;
      neighbor.isVisited = true;
      pq.enqueue(neighbor, neighbor.distance);
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
