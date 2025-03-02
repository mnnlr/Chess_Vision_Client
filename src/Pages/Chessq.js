import React, { useState, useEffect } from "react";
import ChessGame from './ChessGame';
import EvaluationBar from "./EvaluationBar";

const Chessq = () => {
  const [moves, setMoves] = useState([]);
  const [delayedMoves, setDelayedMoves] = useState([]);
  const [evaluation, setEvaluation] = useState(0); // Start with neutral evaluation (50/50)
  const [boardState, setBoardState] = useState(null); // State for board state

  // Calculate evaluation based on material and positional heuristics
  useEffect(() => {
    if (boardState) {
      let whiteMaterial = 0, blackMaterial = 0;
      let whitePositional = 0, blackPositional = 0;

      // Iterate through the 8x8 board from chess.js
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const piece = boardState[i][j];
          if (piece) {
            const squareValue = i * 8 + j; // Convert 2D to 1D for easier indexing
            const isWhite = piece.color === "w";
            const material = getPieceValue(piece.type);

            // Material count
            if (isWhite) {
              whiteMaterial += material;
            } else {
              blackMaterial += material;
            }

            // Positional heuristics
            if (piece.type === "p") { // Pawn structure
              if (isWhite) {
                whitePositional += evaluatePawnStructure(piece, i, j, boardState);
              } else {
                blackPositional += evaluatePawnStructure(piece, i, j, boardState);
              }
            } else if (piece.type === "n" || piece.type === "b") { // Piece activity (knights, bishops)
              if (isWhite) {
                whitePositional += evaluatePieceActivity(piece, i, j);
              } else {
                blackPositional += evaluatePieceActivity(piece, i, j);
              }
            } else if (piece.type === "k") { // King safety
              if (isWhite && (i === 0 || i === 1) && [4, 5].includes(j)) { // White king safety (e1 or nearby, e/f files)
                whitePositional += 0.1; // Bonus for safe king position
              } else if (!isWhite && (i === 7 || i === 6) && [4, 5].includes(j)) { // Black king safety (e8 or nearby, e/f files)
                blackPositional += 0.1;
              }
            } else if (piece.type === "r") { // Rook activity (open files)
              if (isWhite) {
                whitePositional += evaluateRookActivity(piece, i, j, boardState);
              } else {
                blackPositional += evaluateRookActivity(piece, i, j, boardState);
              }
            }
          }
        }
      }

      // Center control bonus (e4, d4, e5, d5 = squares 28, 35, 36, 43)
      const centralSquares = [28, 35, 36, 43];
      for (const square of centralSquares) {
        const i = Math.floor(square / 8);
        const j = square % 8;
        const piece = boardState[i][j];
        if (piece) {
          if (piece.color === "w") {
            whitePositional += 0.1; // Small bonus for controlling center
          } else {
            blackPositional += 0.1;
          }
        }
      }

      // Calculate final evaluation
      let evalValue = (whiteMaterial + whitePositional - (blackMaterial + blackPositional)) / 100;
      
      // Ensure evaluation stays within -10 to +10 range
      evalValue = Math.max(-10, Math.min(10, evalValue));
      setEvaluation(evalValue);
    }
  }, [boardState]);

  // Helper function to get piece value
  const getPieceValue = (pieceType) => {
    switch (pieceType) {
      case "q": return 9; // Queen
      case "r": return 5; // Rook
      case "b": return 3; // Bishop
      case "n": return 3; // Knight
      case "p": return 1; // Pawn
      case "k": return 0; // King (no material value)
      default: return 0;
    }
  };

  // Evaluate pawn structure (simplified: penalize isolated or doubled pawns)
  const evaluatePawnStructure = (piece, i, j, board) => {
    let score = 0;
    const isWhite = piece.color === "w";
    const file = j; // Column (0-7, a-h)

    // Check for isolated pawns (no pawns in adjacent files)
    let hasAdjacentPawn = false;
    for (let f = Math.max(0, file - 1); f <= Math.min(7, file + 1); f++) {
      if (f !== file) { // Skip current file
        for (let r = (isWhite ? 0 : 7); r >= 0 && r <= 7; r += (isWhite ? 1 : -1)) {
          const adjacentPiece = board[r][f];
          if (adjacentPiece && adjacentPiece.type === "p" && adjacentPiece.color === piece.color) {
            hasAdjacentPawn = true;
            break;
          }
        }
      }
      if (hasAdjacentPawn) break;
    }
    if (!hasAdjacentPawn) {
      score -= 0.1; // Penalty for isolated pawn
    }

    // Check for doubled pawns (multiple pawns in the same file)
    let pawnCount = 0;
    for (let r = 0; r < 8; r++) {
      const otherPiece = board[r][file];
      if (otherPiece && otherPiece.type === "p" && otherPiece.color === piece.color) {
        pawnCount++;
      }
    }
    if (pawnCount > 1) {
      score -= 0.2 * (pawnCount - 1); // Penalty for each additional pawn in file
    }

    return score;
  };

  // Evaluate piece activity (simplified: reward central positions for knights/bishops)
  const evaluatePieceActivity = (piece, i, j) => {
    const centralFiles = [3, 4]; // d, e files
    const centralRanks = [3, 4]; // 4th and 5th ranks
    let score = 0;

    if (centralFiles.includes(j) && centralRanks.includes(i)) {
      score += 0.1; // Bonus for central position
    }

    return score;
  };

  // Evaluate rook activity (bonus for open or semi-open files)
  const evaluateRookActivity = (piece, i, j, board) => {
    let score = 0;
    const isWhite = piece.color === "w";
    const file = j; // Column (0-7, a-h)

    // Check if file is open (no pawns for either side)
    let hasWhitePawn = false, hasBlackPawn = false;
    for (let r = 0; r < 8; r++) {
      const otherPiece = board[r][file];
      if (otherPiece && otherPiece.type === "p") {
        if (otherPiece.color === "w") hasWhitePawn = true;
        if (otherPiece.color === "b") hasBlackPawn = true;
      }
    }

    if (!hasWhitePawn && !hasBlackPawn) {
      score += 0.2; // Bonus for open file
    } else if (!hasWhitePawn || !hasBlackPawn) {
      score += 0.1; // Bonus for semi-open file (only opponent's pawns)
    }

    return score;
  };

  // Handle moves and delay (keep existing logic for move display)
  useEffect(() => {
    if (moves.length > 0) {
      // Handle delay for black's move
      if (moves.length % 2 === 0) {
        setTimeout(() => {
          setDelayedMoves([...moves]);
        }, 1000); // 1-second delay for black's move
      } else {
        setDelayedMoves([...moves]);
      }
    }
  }, [moves]);

  return (
    <div className="app-container bg-green-500 flex flex-col items-center justify-center min-h-screen p-5">
      <div className="bg-white p-3 rounded-xl shadow-xl flex flex-col md:flex-row relative w-full max-w-[800px] border border-gray-300">
        {/* Chess Board Section */}
        <div className="relative w-full md:w-2/3 mb-5 md:mb-0 flex">
          <EvaluationBar evaluation={evaluation} />
          <div className="flex flex-col w-full">
            <div className="w-full bg-gray-800 text-white text-center py-2 rounded-t-lg">Black Player</div>
            <div className="chess-board-container p-3 bg-gray-100 rounded-lg">
              <ChessGame setMoves={setMoves} setBoardState={setBoardState} />
            </div>
            <div className="w-full bg-gray-800 text-white text-center py-2 rounded-b-lg">White Player</div>
          </div>
        </div>

        {/* Moves Section */}
        <div className="analysis-sidebar bg-black text-white p-4 ml-0 md:ml-4 rounded-lg w-full md:w-1/3 relative flex flex-col h-[596px]">
          <h3 className="text-center mb-2 text-lg font-semibold">Moves</h3>
          <div className="overflow-y-auto flex-1 space-y-2 p-2 max-h-[550px]">
            {Array.from({ length: Math.ceil(delayedMoves.length / 2) }).map((_, index) => (
              <div key={index} className="flex justify-between bg-gray-900 p-2 rounded-md">
                <span className="text-gray-400">{index + 1}.</span>
                <span className="text-white font-medium">{delayedMoves[index * 2] || "-"}</span>
                <span className="text-white font-medium">{delayedMoves[index * 2 + 1] || "-"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chessq;