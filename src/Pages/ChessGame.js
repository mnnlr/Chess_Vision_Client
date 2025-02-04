import React, { useState} from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [notification, setNotification] = useState("");

  const safeGameMutate = (modify) => {
    modify(game);
    setGame(new Chess(game.fen())); // Update game state after mutation
  };

  //  Check game status after every move
  const checkGameStatus = () => {
    if (game.isCheckmate()) {
      setNotification("Checkmate! Game over.");
    } else if (game.isCheck()) {
      setNotification("Check! Your king is in danger.");
    } else if (game.isDraw()) {
      setNotification("Draw! The game is a draw.");
    } else {
      setNotification(""); // Clear notification if no special condition
    }
  };

  //Computer's random move
  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
    checkGameStatus();
  };

  // Handle user move with try-catch for error handling
  const handleMove = (sourceSquare, targetSquare) => {
    try {
      safeGameMutate((game) => {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // Promote to queen if pawn reaches the last rank
        });

        if (!move) {
          throw new Error("Invalid move");
        }
      });

      checkGameStatus();
      setTimeout(makeRandomMove, 500); // Delay computer's move
      return true; // Move was successful
    } catch (error) {
      toast.error("❌ Invalid move!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false; // Move was invalid
    }
  };


  return (
    
    <div>
    <ToastContainer />
    {notification && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            {notification}
          </div>
        )}
        <Chessboard position={game.fen()} onPieceDrop={handleMove} />
        </div>
  );
};

export default ChessGame;
