import React, {useEffect, useState} from 'react';
import Cell from "./Cell.jsx";
import Modal from "./Modal.jsx";

export const gameState = {
    DRAFT: 'draft',
    O: "O",
    X: "X"
}

const Game = () => {
    const initialBoardState = Array(3).fill(null).map(() => Array(3).fill(0));
    const [board, setBoard] = useState(initialBoardState);
    const [boardCopy, setBoardCopy] = useState(initialBoardState.map(row => row.map(() => "")));
    const [winningIndexes, setWinningIndexes] = useState([]);

    const handleClick = (rowIndexParam, cellIndexParam) => {
        if (winningIndexes.length > 0) return;

        const newBoard = board.map((row, rowIndex) =>
            row.map((cell, cellIndex) =>
                rowIndex === rowIndexParam && cellIndex === cellIndexParam && cell === 0 ? cell + 1 : cell
            )
        );

        const sum = board.flat(1).reduce((acc, el) => acc + el, 0)

        const newBoardCopy = boardCopy.map((row, rowIndex) =>
            row.map((cell, cellIndex) =>
                rowIndex === rowIndexParam && cellIndex === cellIndexParam && cell === "" ? (sum % 2 === 0 ? gameState.O : gameState.X) : cell
            )
        );

        setBoardCopy(newBoardCopy)
        setBoard(newBoard);
    }

    const checkIfGameIsOver = (winner) => {
        if(winner !== null) {
            console.log(`Winner is ${winner}`);
        }
        if(winner === gameState.DRAFT) {
            window.location.reload()
            return null
        }
    }

    useEffect(() => {
        let winner = null;
        let winningCells = [];

        boardCopy.forEach((row, rowIndex) => {
            if (row.every(cell => cell === row[0] && cell !== "")) {
                winner = row[0];
                winningCells = row.map((_, cellIndex) => [rowIndex, cellIndex]);
            }
        });

        for (let col = 0; col < 3; col++) {
            if (boardCopy.every(row => row[col] === boardCopy[0][col] && row[col] !== "")) {
                winner = boardCopy[0][col];
                winningCells = boardCopy.map((_, rowIndex) => [rowIndex, col]);
            }
        }

        if (boardCopy.every((row, index) => row[index] === boardCopy[0][0] && row[index] !== "")) {
            winner = boardCopy[0][0];
            winningCells = boardCopy.map((_, index) => [index, index]);
        }

        if (boardCopy.every((row, index) => row[2 - index] === boardCopy[0][2] && row[2 - index] !== "")) {
            winner = boardCopy[0][2];
            winningCells = boardCopy.map((_, index) => [index, 2 - index]);
        }

        if (!winner && boardCopy.flat().every(cell => cell !== "")) {
            winner = gameState.DRAFT;
            winningCells = [];
        }

        setWinningIndexes(winningCells);
        checkIfGameIsOver(winner);
    }, [boardCopy]);

    return (
        <>
        <div className="board">
            {board.map((row, rowIndex) =>
                row.map((cell, cellIndex) =>
                    <Cell sumOfEl={board.flat(1)}
                          cell={cell}
                          onCellClick={() => handleClick(rowIndex, cellIndex)}
                          isWinningCell={winningIndexes.some(([r, c]) => r === rowIndex && c === cellIndex)}
                    />
                )
            )}

        </div>
            {winningIndexes.length > 0 && <div className="">
                <h2>Game Over</h2>
                <p>Thank you for playing!</p>
                <button onClick={() => window.location.reload()} style={{
                    fontSize: '24px',
                    padding: '15px 30px',
                    borderRadius: '10px',
                    backgroundColor: '#2b6cb0',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}>Play Again
                </button>
            </div>}
        </>

    );
};

export default Game;