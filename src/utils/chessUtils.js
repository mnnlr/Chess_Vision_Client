import { Chess } from "chess.js";
import { toast } from "react-toastify";
import {displayMove} from "./displayMove"


// Handle player move
export const handleMove = (
  sourceSquare,
  targetSquare,
  game,
  setGame,
  setMoves,
  setManualMoves,
  setCurrentMoveIndex,
  setIsManualMove,
  checkGameStatus,
  setMoveHistory
) => { 

  if (typeof setIsManualMove !== "function") {
    console.error("❌ setIsManualMove is NOT a function!");
    return;
  }

  const newGame = new Chess(game.fen()); 
  const possibleMoves = newGame.moves({ verbose: true });
  const isValidMove = possibleMoves.some(
    (move) => move.from === sourceSquare && move.to === targetSquare
  );

  if (!isValidMove) {
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

  const moveResult = newGame.move({
    from: sourceSquare,
    to: targetSquare,
    promotion: "q", // Assuming queen promotion for simplicity
  });

  setGame(newGame); // Update the game state

  setMoves((prevMoves) => {
    const updatedMoves = [...prevMoves, moveResult.san]; // Store move history

    setManualMoves((prev) => ({
      ...prev,
      [updatedMoves.length - 1]: `${sourceSquare}-${targetSquare}`,
    }));

    return updatedMoves;
  });

  setCurrentMoveIndex((prev) => {
    const newIndex = prev + 1;
    console.log("🆕 Updated move index:", newIndex);
    return newIndex;
  });

  // Ensure setIsManualMove(false) runs after state updates
  setTimeout(() => {
    setIsManualMove(false); // Allow nextMove after making a move
  }, 100);

  // Save the move history using displayMove
  displayMove(sourceSquare, targetSquare, moveResult.san, newGame.fen(), setMoveHistory);

  checkGameStatus();
  return true;
};



