import React from "react";
import ReactDOM from "react-dom/client"
import './index.css';

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/*status*/}</div>
                    <div>{/*TODO*/}</div>
                </div>
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true
        }
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            isXNext: !this.state.isXNext
        });
    }

    render() {
        const status = "Next player is " + (this.state.isXNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>{props.value}</button>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game />)