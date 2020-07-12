export function getastarpath(board, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = [];
  let openlist = new Map();
  startNode.distance = 0;
  startNode.h_cost = 0;
  startNode.g_cost = 0;
  unvisitedNodes.push(startNode);
  openlist.set(startNode, startNode);

  while (unvisitedNodes.length !== 0) {
    let closestNode = getClosestNode(unvisitedNodes);
    console.log("Picked", closestNode);
    openlist.delete(closestNode);
    closestNode.isVisited = true; // functions has a closest list indicator
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    const neighbors = getUnvisitedNeighbors(closestNode, board);

    neighbors.forEach((neighbor) => {
      const h_cost = getManhattanDistance(finishNode, neighbor);
      const g_cost = closestNode.g_cost + 1;
      const distance = h_cost + g_cost;
      if (openlist.has(neighbor)) {
        const node = openlist.get(neighbor);
        if (node.distance > distance) {
          node.distance = distance;
          node.h_cost = h_cost;
          node.g_cost = g_cost;
          node.previousNode = closestNode;
        } else if (node.distance === distance) {
          if (node.h_cost > h_cost) {
            node.distance = distance;
            node.h_cost = h_cost;
            node.g_cost = g_cost;
            node.previousNode = closestNode;
          }
        }
      } else {
        neighbor.distance = distance;
        neighbor.h_cost = h_cost;
        neighbor.g_cost = g_cost;
        neighbor.previousNode = closestNode;
        unvisitedNodes.push(neighbor);
        openlist.set(neighbor, neighbor);
      }
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

//Calculates the distance for h_cost
function getManhattanDistance(node1, node2) {
  return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
}
//A version of heapify
// Takes O(n) time to get the smallest node at the beginning of th array and returns it
function getClosestNode(unvisitedNodes) {
  if (unvisitedNodes.length === 1) return unvisitedNodes.pop();

  for (let i = unvisitedNodes.length - 1; i >= 0; i--) {
    sinkDown(i, unvisitedNodes);
  }

  const closestNode = unvisitedNodes[0];

  const temp = unvisitedNodes.pop();
  unvisitedNodes[0] = temp;
  return closestNode;
}

function sinkDown(index, unvisitedNodes) {
  let left = 2 * index + 1;
  let right = 2 * index + 2;
  let smallest = index;
  const length = unvisitedNodes.length - 1;

  if (left <= length) {
    if (unvisitedNodes[smallest].distance > unvisitedNodes[left].distance) {
      smallest = left;
    } else if (
      unvisitedNodes[smallest].distance === unvisitedNodes[left].distance
    ) {
      if (unvisitedNodes[smallest].h_cost > unvisitedNodes[left].h_cost)
        smallest = left;
    }
  }
  if (right <= length) {
    if (unvisitedNodes[smallest].distance > unvisitedNodes[right].distance) {
      smallest = right;
    } else if (
      unvisitedNodes[smallest].distance === unvisitedNodes[right].distance
    ) {
      if (unvisitedNodes[index].h_cost > unvisitedNodes[right].h_cost)
        smallest = right;
    }
  }
  if (smallest !== index) {
    [unvisitedNodes[smallest], unvisitedNodes[index]] = [
      unvisitedNodes[index],
      unvisitedNodes[smallest],
    ];
  }
}
