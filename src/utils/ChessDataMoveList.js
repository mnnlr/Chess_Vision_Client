import React, { useEffect, useRef } from "react";
// import { gameData } from "../data/gameData";

const ChessDataMoveList = ({ currentMoveIndex, gameData }) => {
  const moveListRef = useRef(null);
  const activeMoveRef = useRef(null);
  console.log("ChessDataMoveList received:", gameData);

  if (!gameData || !Array.isArray(gameData.moves) || gameData.moves.length === 0) {
    return (
      <div className="p-4 bg-gray-800 rounded text-white">
        No moves available.
      </div>
    );
  }

  // Auto-scroll to the active move
  // useEffect(() => {
  //   if (activeMoveRef.current) {
  //     activeMoveRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  // }, [currentMoveIndex]);

  return (
    <div className="p-4 bg-gray-800 rounded">
      <div
        ref={moveListRef}
        className="max-h-64 overflow-auto"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Edge & IE
        }}
      >
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari, and Edge */
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {gameData.moves
          .filter((move) => move && move.whiteMove && move.blackMove)
          .map((move, index) => {
            const whiteMoveIndex = index * 2;
            const blackMoveIndex = index * 2 + 1;
            console.log("ChessDataMoveList", gameData);
            return (
              <div
                key={index}
                className="flex justify-between items-center py-1"
              >
                {/* White Move */}
                <div
                  ref={
                    currentMoveIndex === whiteMoveIndex ? activeMoveRef : null
                  }
                  className={`px-2 py-1 rounded transition-all duration-300 ${
                    currentMoveIndex === whiteMoveIndex
                      ? "bg-gray-700 text-gray-200"
                      : "text-white"
                  }`}
                >
                  {move.moveNumber}.{move.whiteMove.notation}
                  {move.whiteMove.icon ? (
                    <img
                      src={move.whiteMove.icon}
                      alt="move icon"
                      className="w-4 h-4 inline ml-1 rounded-lg"
                    />
                  ) : null}
                </div>

                {/* Black Move */}
                <div
                  ref={
                    currentMoveIndex === blackMoveIndex ? activeMoveRef : null
                  }
                  className={`px-2 py-1 rounded transition-all duration-300 ${
                    currentMoveIndex === blackMoveIndex
                      ? "bg-gray-700 text-gray-200"
                      : "text-white"
                  }`}
                >
                  {move.blackMove?.notation}
                  {move.blackMove?.icon ? (
                    <img
                      src={move.blackMove.icon}
                      alt="move icon"
                      className="w-4 h-4 inline ml-1 rounded-lg"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChessDataMoveList;
