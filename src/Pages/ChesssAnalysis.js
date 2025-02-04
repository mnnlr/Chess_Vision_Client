import React, { useState } from "react";
import ChessGame from "./ChessGame"; // Import the ChessGame component

const ChessAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const [showPopup, setShowPopup] = useState(false); // Control modal visibility

  // Handle dropdown change
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    // Show popup only for selected values
    if (["Chess", "Pgn", "LeeChess.orng"].includes(value)) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  return (
    <div className="app-container bg-green-500 flex flex-col items-center justify-center min-h-screen p-5">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row relative w-full max-w-3xl">
        {/* Chess Board Section with Player Labels */}
        <div className="relative w-full md:w-2/3 mb-5 md:mb-0">
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-t-lg">
            Black Player
          </div>
          <div className="chess-board-container p-3 bg-gray-100 rounded-lg">
            <ChessGame /> {/* Render ChessGame component here */}
          </div>
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-b-lg">
            White Player
          </div>
        </div>
        

        {/* Analysis Sidebar */}
        <div className="analysis-sidebar bg-black text-white p-4 ml-0 md:ml-4 rounded-lg w-full md:w-1/3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3">
            ♞ Game Report
          </button>
          <input
            type="text"
            placeholder="Enter PGN..."
            className="p-2 text-black w-full rounded mb-3"
          />
          <select
            className="p-2 text-black w-full rounded mb-3"
            onChange={handleSelectChange}
          >
            <option value="">Select an option</option>
            <option value="Chess">Chess.com</option>
            <option value="Pgn">Pgn</option>
            <option value="LeeChess.orng">LeeChess.orng</option>
            <option value="JSON">JSON</option>
          </select>

          {/* Unified Black Analysis Section */}
         
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3">
              🔍 Analyze
            </button>
             <br/>
             <br/> 
             <br/>
             <br/>
             <br/>
             <br/> 
             <br/>
             <br/>
            {/* Depth Control */}
            <div className="bg-gray-800 p-3 rounded-lg mb-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold">⚙ Depth</span>
                <span className="text-gray-400">Arrow</span>
              </div>
              <input type="range" className="w-full mt-2" />
            </div>

            {/* Playback Controls */}
            <div className="bg-gray-800 p-3 rounded-lg flex justify-between">
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">⏪</button>
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">▶</button>
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">⏩</button>
            </div>
          </div>
     
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-3">
              Select a Game
            </h2>

            {/* Options Inside Popup */}
            <div className="flex flex-col space-y-2">
              <button className="p-2 bg-gray-700 rounded text-left">
                Blizer
              </button>
              <button className="p-2 bg-gray-700 rounded text-left">
                Blizer
              </button>
              <button className="p-2 bg-gray-700 rounded text-left">
                Blizer
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-3 space-x-2">
              <button className="p-2 bg-gray-700 rounded">←</button>
              <button className="p-2 bg-gray-700 rounded">→</button>
            </div>

            {/* Cancel Button */}
            <button
              className="mt-4 bg-gray-600 p-2 rounded w-full"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessAnalysis;
