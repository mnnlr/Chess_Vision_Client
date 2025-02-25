import { Chess } from "chess.js";

export const parsePGN = (pgn) => {
  try {
    const chess = new Chess();
    chess.loadPgn(pgn);
    const history = chess.history({ verbose: true });

    return history.map((move, index) => ({
      moveNumber: Math.floor(index / 2) + 1,
      whiteMove:
        index % 2 === 0 ? { fen: move.after, notation: move.san } : null,
      blackMove:
        index % 2 !== 0 ? { fen: move.after, notation: move.san } : null,
    }));
  } catch (error) {
    console.log(pgn);
    console.error("Error parsing PGN:", error);
    return null;
  }
};

// ParsePGN for Input PGN moves Data
export const parsePGNInput = (pgn) => {
  try {
    const chess = new Chess();
    chess.loadPgn(pgn);
    const history = chess.history({ verbose: true });

    const moves = [];
    let moveNumber = +1; // Track actual move number

    for (let i = 0; i < history.length; i++) {
      if (i % 2 === 0) {
        // White's move
        moves.push({
          moveNumber: moveNumber, // Assign correct move number
          whiteMove: { fen: history[i].after, notation: history[i].san },
          blackMove: null, // Placeholder for Black's move
        });
      } else {
        moves[moves.length - 1].blackMove = {
          fen: history[i].after,
          notation: history[i].san,
        };
        moveNumber++; // Increment move number after Black's move
      }
    }

    return moves;
  } catch (error) {
    console.error("Error parsing PGN:", error);
    return null;
  }
};
