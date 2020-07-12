import React, { Component } from "react";
import Header from "./Header";
import Vertex from "./Vertex/Vertex";
import { selectAlgorithm, resetWalls } from "./selectalgorithm.js";
import { recursive } from "./MazeGeneration/recursive";
import "./Board.css";

let START_ROW = 10;
let START_COL = 5;
let FINISH_ROW = 15;
let FINISH_COL = 25;
export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      isMousePressed: false,
      algorithm: "",
      startNodeClicked: false,
      finishNodeClicked: false,
      prevElement: null,
    };
  }

  getInitialBoard = () => {
    const board = [];
    for (let row = 0; row < 25; row++) {
      let currentRow = [];
      for (let col = 0; col < 45; col++) {
        currentRow.push(this.createNode(row, col));
      }
      board.push(currentRow);
    }
    return board;
  };
  createNode = (row, col) => {
    return {
      row,
      col,
      distance: Infinity,
      h_cost: Infinity,
      g_cost: Infinity,
      isStart: START_ROW === row && START_COL === col,
      isFinish: FINISH_ROW === row && FINISH_COL === col,
      isVisited: false,
      previousNode: null,
      isWall: false,
    };
  };
  getNewBoard = (row, col) => {
    const newBoard = this.state.board;
    let node = newBoard[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newBoard[row][col] = newNode;
    return newBoard;
  };
  updateStartNode = (row, col) => {
    const newBoard = this.state.board;
    let node = newBoard[row][col];
    const newNode = {
      ...node,
      isStart: true,
      isWall: false,
    };
    newBoard[row][col] = newNode;
    START_ROW = row;
    START_COL = col;
    return newBoard;
  };
  updateFinishNode = (row, col) => {
    const newBoard = this.state.board;
    let node = newBoard[row][col];
    const newNode = {
      ...node,
      isFinish: true,
      isWall: false,
    };
    newBoard[row][col] = newNode;
    FINISH_ROW = row;
    FINISH_COL = col;
    return newBoard;
  };
  removeStartNode = (row, col) => {
    const newBoard = this.state.board;
    let node = newBoard[row][col];
    const newNode = {
      ...node,
      isStart: false,
    };
    newBoard[row][col] = newNode;
    return newBoard;
  };
  removeFinishNode = (row, col) => {
    const newBoard = this.state.board;
    let node = newBoard[row][col];
    const newNode = {
      ...node,
      isFinish: false,
    };
    newBoard[row][col] = newNode;
    return newBoard;
  };
  componentDidMount() {
    this.setState({
      board: this.getInitialBoard(),
    });
  }
  mousePressed = (row, col) => {
    if (this.state.board[row][col].isStart) {
      this.setState({
        startNodeClicked: true,
        isMousePressed: true,
        prevElement: this.state.board[row][col],
        board: this.removeStartNode(row, col),
      });
    } else if (this.state.board[row][col].isFinish) {
      this.setState({
        finishNodeClicked: true,
        isMousePressed: true,
        prevElement: this.state.board[row][col],
        board: this.removeFinishNode(row, col),
      });
    } else {
      this.setState({
        board: this.getNewBoard(row, col),
        isMousePressed: true,
      });
    }
  };
  mouseEnter = (row, col) => {
    if (this.state.isMousePressed) {
      if (this.state.startNodeClicked) {
        document
          .getElementById(
            `${this.state.prevElement.row}-${this.state.prevElement.col}`
          )
          .classList.remove("start");
        document
          .getElementById(
            `${this.state.board[row][col].row}-${this.state.board[row][col].col}`
          )
          .classList.add("start");
        this.setState({
          prevElement: this.state.board[row][col],
        });
      } else if (this.state.finishNodeClicked) {
        document
          .getElementById(
            `${this.state.prevElement.row}-${this.state.prevElement.col}`
          )
          .classList.remove("finish");
        document
          .getElementById(
            `${this.state.board[row][col].row}-${this.state.board[row][col].col}`
          )
          .classList.add("finish");
        this.setState({
          prevElement: this.state.board[row][col],
        });
      } else {
        this.setState({
          board: this.getNewBoard(row, col),
        });
      }
    }
  };
  mouseReleased = (row, col) => {
    if (this.state.startNodeClicked) {
      this.setState({
        board: this.updateStartNode(row, col),
        startNodeClicked: false,
      });
    } else if (this.state.finishNodeClicked) {
      this.setState({
        board: this.updateFinishNode(row, col),
        finishNodeClicked: false,
      });
    }
    this.setState({
      isMousePressed: false,
    });
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  generateMaze = async () => {
    document.getElementById("mazeButton").disabled = true;
    await this.resetWallsandPath();
    const wallstoanimate = recursive(
      this.state.board,
      2,
      this.state.board.length - 3,
      2,
      this.state.board[0].length - 3,
      "horizontal",
      false
    );

    this.animatewalls(wallstoanimate);
  };
  animatewalls = (wallstoanimate) => {
    for (let i = 0; i <= wallstoanimate.length; i++) {
      if (i === wallstoanimate.length) {
        setTimeout(() => {
          document.getElementById("mazeButton").disabled = false;
        }, 8 * i);
        break;
      }
      setTimeout(() => {
        document.getElementById(
          `${wallstoanimate[i].row}-${wallstoanimate[i].col}`
        ).className = "vertex iswall";
      }, 8 * i);
    }
  };
  findPath = () => {
    this.resetBoard();

    const startNode = this.state.board[START_ROW][START_COL];
    const finishNode = this.state.board[FINISH_ROW][FINISH_COL];
    selectAlgorithm(
      this.state.algorithm,
      this.state.board,
      startNode,
      finishNode
    );
  };
  resetBoard = () => {
    for (let i = 0; i < this.state.board.length; i++) {
      for (let j = 0; j < this.state.board[0].length; j++) {
        document
          .getElementById(
            `${this.state.board[i][j].row}-${this.state.board[i][j].col}`
          )
          .classList.remove("node-shortest-path");
        document
          .getElementById(
            `${this.state.board[i][j].row}-${this.state.board[i][j].col}`
          )
          .classList.remove("node-visited");
      }
    }
  };
  resetWallsandPath = async () => {
    await resetWalls(this.state.board);
    for (let i = 0; i < this.state.board.length; i++) {
      for (let j = 0; j < this.state.board[0].length; j++) {
        document
          .getElementById(
            `${this.state.board[i][j].row}-${this.state.board[i][j].col}`
          )
          .classList.remove("node-shortest-path");
        document
          .getElementById(
            `${this.state.board[i][j].row}-${this.state.board[i][j].col}`
          )
          .classList.remove("node-visited");
        document
          .getElementById(
            `${this.state.board[i][j].row}-${this.state.board[i][j].col}`
          )
          .classList.remove("iswall");
      }
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className=" menu row">
            <div className="col-4">
              <select
                className="custom-select filter"
                name="algorithm"
                onChange={this.onChange}
              >
                <option selected>Algorithm</option>
                <option value="djkstra">Djkstra's</option>
                <option value="astar">A Star</option>
                <option value="bfs">Breadth First Search</option>
                <option value="dfs">Depth First Search</option>
              </select>
            </div>

            <button
              type="button"
              className="btn btn-dark col-2"
              id="pathBtn"
              onClick={this.findPath}
            >
              Find Path
            </button>
            <button
              type="button"
              className="btn btn-dark col-2"
              id="mazeButton"
              onClick={this.generateMaze}
              disabled={this.state.disabled}
            >
              Generate Maze
            </button>

            <button
              type="button"
              className="btn btn-dark col-2"
              onClick={() => window.location.reload(false)}
            >
              Clear Board
            </button>
          </div>
        </div>
        <div className="infotext">
          <ul>
            <li>
              <div className="start"></div>Start Node
            </li>
            <li>
              <div className="finish"></div>Target Node
            </li>
            <li>
              <div className="vertex"></div>Unvisited Node
            </li>
            <li>
              <div className="node-visited "></div>
              Visited Nodes
            </li>
            <li>
              <div className="node-shortest-path"></div>Shortest-path Node
            </li>
            <li>
              <div className="iswall"></div>Wall Node
            </li>
          </ul>
        </div>
        <div className="board">
          {this.state.board.map((row, rowID) => {
            return row.map((node, nodeIdx) => {
              return (
                <Vertex
                  key={nodeIdx}
                  node={node}
                  mousePressed={this.mousePressed}
                  mouseEnter={this.mouseEnter}
                  mouseReleased={this.mouseReleased}
                ></Vertex>
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default Board;
