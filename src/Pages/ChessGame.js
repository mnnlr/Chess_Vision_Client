import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());

  const [position, setPosition] = useState(game.fen());
  const [notification, setNotification] = useState("");
  console.log(game);

  const safeGameMutate = (modify) => {
    modify(game);
    setGame(new Chess(game.fen())); // Set the game state to a new instance with the updated position
  };



  // Movement of computer
  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    // exit if the game is over

    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    // play random move
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex])
    })
  }

  // Perform an action when a piece is droped by a user

  const handleMove = (sourceSquare, targetSquare) => {
    let moveOne = null;
    safeGameMutate(() => {

      moveOne = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // Promote to queen if the move is a pawn promotion
      })
    });

    // illegal move
    if (moveOne === null) return false;
    // setPosition(game.fen());

    // Check if the game is in check or checkmate
    if (game.isCheckmate()) {
      setNotification("Checkmate! Game over.");
    } else if (game.isCheck()) {
      setNotification("Check! Your king is in danger.");
    } else if (game.isDraw()) {
      setNotification("Draw! The game is a draw.");
    } else {
      setNotification(""); // Clear notification if there's no special condition
    }

    // valid move
    setTimeout(makeRandomMove, 200);
    return true;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          width: "20%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgreen",
        }}
      >
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
      </div>
      <div
        style={{
          width: "40%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chessboard position={game.fen()} onPieceDrop={handleMove} />
      </div>
      <div
        style={{
          width: "20%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgreen",
        }}
      ></div>
    </div>
  );
};

export default ChessGame;
