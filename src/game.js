import Board from './board';
import React from "react";
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            isXNext: true,
            stepNumber: 0
        }
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = Winner(current.squares);
        const status = winner != null ? "The winner is " + winner : "Next player is " + (this.state.isXNext ? 'X' : 'O');
        const moves = history.map((step, move) => {
            const description = move ? 'Go to move ' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>);
        })
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        let winner = Winner(current.squares);
        if (winner != null) {
            return;
        }

        let squares = current.squares.slice();
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: squares }]),
            isXNext: !this.state.isXNext,
            stepNumber: history.length
        });
    }
}


function Winner(squares) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;