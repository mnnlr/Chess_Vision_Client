import { Chess } from "chess.js";
// import { gameData } from "../data/gameData";

// Navigate to next move
export const nextMove = (
  game,
  setGame,
  currentMoveIndex,
  setCurrentMoveIndex,
  isManualMove,
  setIsManualMove,
  selectedGame
) => {
  if (!selectedGame || !selectedGame.moves || selectedGame.moves.length === 0) {
    console.error("No moves available!");
    return;
  }

  if (isManualMove) {
    console.warn("Manual move detected. Next move is disabled.");
    return;
  }

  if (currentMoveIndex < selectedGame.moves.length * 2 - 1) {
    let newIndex = currentMoveIndex === -1 ? 0 : currentMoveIndex + 1;
    const moveIndex = Math.floor(newIndex / 2);
    const isWhiteMove = newIndex % 2 === 0;

    if (selectedGame.moves[moveIndex]) {
      const newFen = isWhiteMove
        ? selectedGame.moves[moveIndex].whiteMove?.fen
        : selectedGame.moves[moveIndex].blackMove?.fen;

      if (!newFen) {
        console.error(
          "No FEN found for move",
          moveIndex,
          "Is White Move:",
          isWhiteMove
        );
        return;
      }
      console.log("Moving to next move:", newFen);
      setGame(new Chess(newFen));
      setCurrentMoveIndex(newIndex);
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
  selectedGame,
  checkGameStatus
) => {
  console.log("prevMove called, current index:", currentMoveIndex);

  if (currentMoveIndex <= 0) {
    console.warn("No previous moves available.");
    return;
  }

  if (!selectedGame || !selectedGame.moves || selectedGame.moves.length === 0) {
    console.error("gameData.moves is missing or empty!");
    return;
  }

  let newMoveIndex = currentMoveIndex - 1;
  let newFen = null;

  while (newMoveIndex >= 0) {
    const moveIndex = Math.floor(newMoveIndex / 2);
    const isWhiteMove = newMoveIndex % 2 === 0;

    const expectedFen = isWhiteMove
      ? selectedGame.moves[moveIndex]?.whiteMove?.fen
      : selectedGame.moves[moveIndex]?.blackMove?.fen;

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
    setIsManualMove(false);
    checkGameStatus();
  } else {
    console.error("No valid previous move found!");
  }
};
