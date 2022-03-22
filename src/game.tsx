import React from "react";
import Board from "./board";

interface GameProps {
}

interface GameState {
  xIsNext: boolean;
  history: string[][];
}

export default class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps | Readonly<GameProps>) {
    super(props);
    this.state = {
      history: [Array(9).fill('')],
      xIsNext: true
    };
  }

  current(): string[] {
    return this.state.history[this.state.history.length - 1].slice();
  }

  handleClick(i: number) {
    const squares = this.current();
    if (this.calculateWinner() || squares[i])
      return;
    const xIsNext = this.state.xIsNext;
    squares[i] = xIsNext ? 'X' : 'O';

    const newHistory = this.state.history.slice();
    newHistory.push(squares);

    this.setState({history: newHistory, xIsNext: !xIsNext});
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const squares = this.current().slice();
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner();
    let status;
    if (winner) status = 'Winner: ' + winner;
    else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i: number) => this.handleClick(i)}
            squares={this.current()}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
