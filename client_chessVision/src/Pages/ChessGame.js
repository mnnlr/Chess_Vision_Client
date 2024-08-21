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
 
  if(game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
    return;
  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  // play random move
  safeGameMutate((game)=>{
    game.move(possibleMoves[randomIndex])
  })
  }

  // Perform an action when a piece is droped by a user

  const handleMove = (sourceSquare, targetSquare) => {
    let moveOne = null;
    safeGameMutate(()=>{

      moveOne = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // Promote to queen if the move is a pawn promotion
      })
    });

    // illegal move
    if (moveOne === null) {
      setNotification('Invalid Move Please try again');
      return false;
    };
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="w-1/5 h-full flex justify-center items-center bg-lightgreen">
      {notification && (
        <div className="p-2 bg-red-500 text-white rounded text-center">
          {notification}
        </div>
      )}
    </div>
    <div className="w-2/5 h-full flex justify-center items-center">
      <Chessboard position={game.fen()} onPieceDrop={handleMove} boardWidth={500} />
    </div>
    <div className="w-1/5 h-full flex justify-center items-center bg-lightgreen"></div>
  </div>
  );
};

export default ChessGame;
