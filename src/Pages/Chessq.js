import React from "react";
import ChessGame from './ChessGame'; // Import the ChessGame component

const Chessq = () => {
  return (
    <div className="app-container bg-green-500 flex flex-col items-center justify-center min-h-screen p-5">
    
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row relative w-full max-w-3xl"> {/* Reduced max-width further */}
        {/* Chess Board Section with Player Labels */}
        <div className="relative w-full md:w-2/3 mb-5 md:mb-0">
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-t-lg">Black Player</div>
          <div className="chess-board-container p-3 bg-gray-100 rounded-lg"> {/* Reduced padding */}
            <ChessGame /> {/* Render ChessGame component here */}
          </div>
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-b-lg">White Player</div>
        </div>

        {/* Moves  */}
        <div className="analysis-sidebar bg-black text-white p-4 ml-0 md:ml-4 rounded-lg w-full md:w-1/3"> {/* Reduced padding and margin */}
          <div className="text center ">
            Moves
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chessq;
