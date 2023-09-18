import React, { useState } from 'react';
import Board from './board';
import Modal from './modal-window';

const App: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleClick = (i: number) => {
    if (squares[i] || winner) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    if (calculateWinner(newSquares)) {
      setWinner(newSquares[i]);
      openModal();
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const calculateWinner = (squares: Array<string | null>) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(square => square)
      ? "It's a Draw, please press a button for a restart!"
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setSquares(Array(9).fill(''));
    setXIsNext(true);
    setWinner('');
  }

  return (
    <div className="game">
      <div className="game-info">
        <div className={`status ${winner ? (winner === 'X' ? 'winnerX' : 'winnerO') : ''}`}>
          {status}
          <button className="button" onClick={resetGame}>Reset Game</button>
        </div>
      </div>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      {showModal && <Modal winner={winner} closeModal={closeModal} />}
    </div >
  );
}

export default App;