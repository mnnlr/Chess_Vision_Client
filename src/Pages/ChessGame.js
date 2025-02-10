import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ChessGame = ({ setMoves }) => { // Accept setMoves as prop
  const [game, setGame] = useState(new Chess());
  const [notification, setNotification] = useState("");

  const safeGameMutate = (modify) => {
    modify(game);
    setGame(new Chess(game.fen())); // Update game state after mutation
  };

  const checkGameStatus = () => {
    if (game.isCheckmate()) {
      setNotification("Checkmate! Game over.");
    } else if (game.isCheck()) {
      setNotification("Check! Your king is in danger.");
    } else if (game.isDraw()) {
      setNotification("Draw! The game is a draw.");
    } else {
      setNotification("");
    }
  };

  // Handle user move
  const handleMove = (sourceSquare, targetSquare) => {
    try {
      let moveResult;
      safeGameMutate((game) => {
        moveResult = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        if (!moveResult) {
          throw new Error("Invalid move");
        }
      });

      if (moveResult) {
        setMoves((prevMoves) => [...prevMoves, moveResult.san]); // Send move to Chessq.js
      }

      checkGameStatus();
      setTimeout(makeRandomMove, 500);
      return true;
    } catch (error) {
      toast.error("❌ Invalid move!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
  };

  // Computer's random move
  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    let moveResult;
    safeGameMutate((game) => {
      moveResult = game.move(possibleMoves[randomIndex]);
    });

    if (moveResult) {
      setMoves((prevMoves) => [...prevMoves, moveResult.san]); // Send move to Chessq.js
    }

    checkGameStatus();
  };

  return (
    <div>
      <ToastContainer />
      {notification && (
        <div className="notification-box">{notification}</div>
      )}
      <Chessboard position={game.fen()} onPieceDrop={handleMove} />
    </div>
  );
};

export default ChessGame;
