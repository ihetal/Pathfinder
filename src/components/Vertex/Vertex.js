import React, { Component } from "react";
import "./Vertex.css";
export class Vertex extends Component {
  render() {
    const dynamicclass = this.props.node.isFinish
      ? "vertex finish"
      : this.props.node.isStart
      ? "vertex start "
      : this.props.node.isWall
      ? "vertex iswall"
      : "vertex";
    return (
      <div
        className={dynamicclass}
        id={`${this.props.node.row}-${this.props.node.col}`}
        onMouseDown={this.props.mousePressed.bind(
          this,
          this.props.node.row,
          this.props.node.col
        )}
        onMouseEnter={this.props.mouseEnter.bind(
          this,
          this.props.node.row,
          this.props.node.col
        )}
        onMouseUp={this.props.mouseReleased.bind(
          this,
          this.props.node.row,
          this.props.node.col
        )}
      ></div>
    );
  }
}

export default Vertex;
