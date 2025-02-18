import { Chess } from "chess.js";
import { gameData } from "../data/gameData";

// Navigate to next move
export const nextMove = (
  game,
  setGame,
  currentMoveIndex,
  setCurrentMoveIndex,
  isManualMove,
  setIsManualMove,
  checkGameStatus
) => {
  console.log("nextMove called, current index:", currentMoveIndex);

  if (isManualMove) {
    console.warn("Manual move detected. Next move is disabled.");
    return;
  }

  if (currentMoveIndex < gameData.moves.length * 2) {
    let newIndex = currentMoveIndex === -1 ? 0 : currentMoveIndex + 1;
    const moveIndex = Math.floor(newIndex / 2);
    const isWhiteMove = newIndex % 2 === 0;

    if (gameData.moves[moveIndex]) {
      const newFen = isWhiteMove
        ? gameData.moves[moveIndex].whiteMove.fen
        : gameData.moves[moveIndex].blackMove.fen;

      setTimeout(() => {
        console.log("Moving to next move:", newFen);
        setGame(new Chess(newFen));
        setCurrentMoveIndex(newIndex);
        checkGameStatus();
      }, 200);
    } else {
      console.error("No recorded move found for index", moveIndex);
    }
  }
};

// Navigate to prev move
export const prevMove = (
  game,
  setGame,
  currentMoveIndex,
  setCurrentMoveIndex,
  isManualMove,
  setIsManualMove,
  checkGameStatus
) => {
  console.log("prevMove called, current index:", currentMoveIndex);

  if (currentMoveIndex <= 0) {
    console.warn("No previous moves available.");
    return;
  }

  if (!gameData || !gameData.moves || gameData.moves.length === 0) {
    console.error("gameData.moves is missing or empty!");
    return;
  }

  let newMoveIndex = currentMoveIndex - 1;
  let newFen = null;

  while (newMoveIndex >= 0) {
    const moveIndex = Math.floor(newMoveIndex / 2);
    const isWhiteMove = newMoveIndex % 2 === 0;

    const expectedFen = isWhiteMove
      ? gameData.moves[moveIndex]?.whiteMove?.fen
      : gameData.moves[moveIndex]?.blackMove?.fen;

    if (expectedFen) {
      newFen = expectedFen;
      break;
    }

    console.warn(
      `No valid move found at index ${newMoveIndex}, checking previous move...`
    );
    newMoveIndex--;
  }

  if (newFen) {
    console.log("Found recorded move, updating game to FEN:", newFen);
    setGame(new Chess(newFen));
    setCurrentMoveIndex(newMoveIndex);
    setIsManualMove(false); //Ensure nextMove can work
    checkGameStatus();
  } else {
    console.error("No valid previous move found!");
  }
};
