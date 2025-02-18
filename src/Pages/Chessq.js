import React, { useState, useEffect } from "react";
import ChessGame from './ChessGame';
import { FaStepForward , FaPlay, FaStepBackward} from "react-icons/fa";


const Chessq = () => {
  const [moves, setMoves] = useState([]);
  const [delayedMoves, setDelayedMoves] = useState([]);

  useEffect(() => {
    if (moves.length > 0) {
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
        <div className="relative w-full md:w-2/3 mb-5 md:mb-0">
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-t-lg">Black Player</div>
          <div className="chess-board-container p-3 bg-gray-100 rounded-lg">
            <ChessGame setMoves={setMoves} />
          </div>
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-b-lg">White Player</div>
        </div>

        {/* Moves Section */}
        <div className="analysis-sidebar bg-black text-white p-4 ml-0 md:ml-4 rounded-lg w-full md:w-1/3 relative flex flex-col h-[596px]">
          <h3 className="text-center mb-2 text-lg font-semibold">Moves</h3>

          {/* Scrollable Moves List */}
          <div className="overflow-y-auto flex-1 space-y-2 p-2 max-h-[550px]">
            {Array.from({ length: Math.ceil(delayedMoves.length / 2) }).map((_, index) => (
              <div key={index} className="flex justify-between bg-gray-900 p-2 rounded-md">
                <span className="text-gray-400">{index + 1}.</span>
                <span className="text-white font-medium">{delayedMoves[index * 2] || "-"}</span>
                <span className="text-white font-medium">{delayedMoves[index * 2 + 1] || "-"}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 bg-gray-900 p-4 rounded-md text-lg font-medium">
    <div className="flex justify-between">
      <span className="text-gray-400">White:</span>
      <span>{delayedMoves.length > 1 ? delayedMoves[delayedMoves.length - 2] : "-"}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-400">Black:</span>
      <span>{delayedMoves.length > 0 ? delayedMoves[delayedMoves.length - 1] : "-"}</span>
    </div>
  </div>

          {/* Playback Buttons Fixed at Bottom */}
          <div className="bg-gray-800 p-3 rounded-lg flex justify-between w-full ">
            <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">
            <FaStepBackward  size={20} />
            </button>
            <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">
              <FaPlay size={20} />
            </button>
            <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">
            <FaStepForward   size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chessq;
