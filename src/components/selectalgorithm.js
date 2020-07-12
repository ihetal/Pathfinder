import { dijkstra } from "./Algorithms/dijkstra";
import { getdfspath } from "./Algorithms/depthfirstsearch";
import { getbfspath } from "./Algorithms/breathfirstsearch";
import { getastarpath } from "./Algorithms/astar";

export function selectAlgorithm(algorithm, board, startNode, finishNode) {
  let visitedNodesInOrder = [];
  let nodesInShortestPath = [];
  document.getElementById("pathBtn").disabled = true;
  switch (algorithm) {
    case "djkstra":
      visitedNodesInOrder = dijkstra(board, startNode, finishNode);
      nodesInShortestPath = getShortestPath(finishNode);
      visualizeAlgorithm(board, visitedNodesInOrder, nodesInShortestPath);
      resetBoard(board);
      break;
    case "dfs":
      visitedNodesInOrder = getdfspath(board, startNode, finishNode);
      nodesInShortestPath = getShortestPath(finishNode);
      visualizeAlgorithm(board, visitedNodesInOrder, nodesInShortestPath);
      break;
    case "bfs":
      visitedNodesInOrder = getbfspath(board, startNode, finishNode);
      nodesInShortestPath = getShortestPath(finishNode);
      visualizeAlgorithm(board, visitedNodesInOrder, nodesInShortestPath);
      resetBoard(board);
      break;
    case "astar":
      visitedNodesInOrder = getastarpath(board, startNode, finishNode);
      nodesInShortestPath = getShortestPath(finishNode);
      visualizeAlgorithm(board, visitedNodesInOrder, nodesInShortestPath);
      resetBoard(board);
      break;
    default:
      alert("Pick an Algorithm!!");
      document.getElementById("pathBtn").disabled = false;
  }
}
function getShortestPath(finishNode) {
  let nodesInShortestPath = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPath;
}

function visualizeAlgorithm(board, visitedNodesInOrder, nodesInShortestPath) {
  setTimeout(() => {
    document.getElementById(
      `${visitedNodesInOrder[0].row}-${visitedNodesInOrder[0].col}`
    ).className = "start vertex node-visited";
  }, 1);
  for (let i = 1; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(board, nodesInShortestPath);
      }, 10 * i);
      return;
    } else if (
      board[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isFinish
    ) {
      setTimeout(() => {
        document.getElementById(
          `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
        ).className = "finish vertex node-visited";
      }, 10 * i);
    } else {
      setTimeout(() => {
        document.getElementById(
          `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
        ).className = "vertex node-visited";
      }, 10 * i);
    }
  }
}

function animateShortestPath(board, nodesInShortestPathOrder) {
  if (nodesInShortestPathOrder.length <= 1) {
    document.getElementById("pathBtn").disabled = false;
    return;
  }
  setTimeout(() => {
    const node = nodesInShortestPathOrder[0];
    document.getElementById(`${node.row}-${node.col}`).className =
      "start vertex node-shortest-path";
  }, 1);
  for (let i = 1; i <= nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    if (i === nodesInShortestPathOrder.length) {
      setTimeout(() => {
        document.getElementById("pathBtn").disabled = false;
      }, 50 * i);
      break;
    }
    if (board[node.row][node.col].isFinish) {
      setTimeout(() => {
        document.getElementById(`${node.row}-${node.col}`).className =
          "finish vertex node-shortest-path";
      }, 10 * i);
    } else {
      setTimeout(() => {
        document.getElementById(`${node.row}-${node.col}`).className =
          "vertex node-shortest-path";
      }, 50 * i);
    }
  }
}

function resetBoard(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      board[row][col].isVisited = false;
      board[row][col].previousNode = null;
    }
  }
}

export function resetWalls(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      board[row][col].isWall = false;
    }
  }
}
