import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChessGame = ({ setMoves, setBoardState }) => { // Accept setBoardState as prop
  const [game, setGame] = useState(new Chess());
  const [notification, setNotification] = useState("");

  const safeGameMutate = (modify) => {
    modify(game);
    setGame(new Chess(game.fen())); // Update game state after mutation
    setBoardState(game.board()); // Pass current board state to parent
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
        setMoves((prevMoves) => [...prevMoves, moveResult.san]);
      }

      checkGameStatus();
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

  return (
    <div>
      <ToastContainer />
      {notification && <div className="notification-box">{notification}</div>}
      <div className="chess-container">
        <Chessboard position={game.fen()} onPieceDrop={handleMove} />
      </div>
    </div>
  );
};

export default ChessGame;