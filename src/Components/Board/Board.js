import React, { useState } from "react";
import Square from "../Square/Square";
import r2h from "../../img/r2h.png";
import fellowship from "../../img/fellowships.png";
import Reset from "../Reset/Reset";
const Board = () => {
    // Declare empty array of 9 values set to null(will be added later)
    const initialBoard = Array(9).fill(null);
    // Create state variables and updating function then set value to the empty array
    const [squares, setSquares] = useState(initialBoard);
    // Create state variables and updating function then set value true
    const [playerXIsNext, setPlayerXIsNext] = useState(true);

    const handleClick = (e) => {
        // Create array that is a copy of state
        const newSquares = [...squares];
        const winnerDeclared = Boolean(calculateWinner(squares));

        if (winnerDeclared) return;
        // Set value of square to the opposite of the last playerXIsNext state
        newSquares[e] = playerXIsNext ? "X" : "O";
        // set squares to copy
        setSquares(newSquares);
        // Change boolean value of player
        setPlayerXIsNext(!playerXIsNext);
    };

    const isBoardFull = (squares) => {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] == null) {
                return false;
            }
        }
        return true;
    };

    const getStatus = () => {
        if (winner) {
            return `Congrats player ${winner} you won!`;
        } else if (isBoardFull(squares)) {
            return "Draw!";
        } else {
            return "Next player is player " + (playerXIsNext ? "X" : "O");
        }
    };

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => {
                    handleClick(i);
                }}
            />
        );
    };

    const reset = (i) => {
        setSquares(initialBoard);
        setPlayerXIsNext(true);
    };

    const calculateWinner = (squares) => {
        /* Squares indexes as they appear in UI:
        0 1 2
        3 4 5
        6 7 8
        */
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]; // shows all of the winning combinations ("lines")
        for (let line of lines) {
            const [a, b, c] = line;
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(squares);
    return (
        <>
            <main
                className={`main--container 
            ${
                (winner &&
                    getStatus() ===
                        "Congratulations Player " + winner + ", you won!") ||
                (!winner && getStatus() === "Draw!")
                    ? getStatus() === "Draw!"
                        ? "draw"
                        : "winner"
                    : playerXIsNext
                    ? "X"
                    : "O"
            }`}
            >
                <div className="logo">
                    <img src={r2h} alt="r2h logo" />
                    <img src={fellowship} alt="fellowship" />
                </div>
                <div className="status">{getStatus()}</div>
                <div className="board--container">
                    <div className="board">
                        <div className="board--row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className="board--row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className="board--row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                    <Reset reset={reset} />
                </div>
            </main>
        </>
    );
};
export default Board;
