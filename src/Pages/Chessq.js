import React, { useState, useEffect } from "react";
import ChessGame from './ChessGame';


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

          {/* Playback Buttons Fixed at Bottom */}
          {/* Playback Controls */}
          <div className="bg-gray-800 p-3 rounded-lg flex justify-between">
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 7h10v3l4-4l-4-4v3H5v6h2zm10 10H7v-3l-4 4l4 4v-3h12v-6h-2z" /></svg></button>
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z" /></svg></button>

              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10 17l5-5l-5-5z" /></svg></button>
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></button>

              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6 18l8.5-6L6 6zM16 6v12h2V6z" /></svg></button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chessq;
