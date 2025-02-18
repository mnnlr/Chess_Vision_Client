import React, { useState, useEffect } from "react";
import ChessGame from "./ChessGame"; // Import the ChessGame component
import { FetchgamesByDate } from "../utils/FetchgamesByDate";
import { AnalyseGame } from "../utils/AnalyseGames";
import ChessGraph from "../utils/ChessGraph";
import MoveAnalysis from "../utils/MoveAnalysis";
import { Chess } from "chess.js";
import { positions } from "../data/ChessData";
import { nextMove, prevMove } from "../utils/moveNavigation";
import { gameData } from "../data/gameData";
import { Chessboard } from "react-chessboard";
import { handleMove, makeHadalMove } from "../utils/chessUtils"; // Import move handlers
import ChessDataMoveList from "../utils/ChessDataMoveList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChessAnalysis = ({ setMoves = () => {} }) => {
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const [showPopup, setShowPopup] = useState(false); // Control modal visibility
  const [hidesubmitbtn, sethidesubmitbtn] = useState(false); // for show and hide button
  const [GamesData, setGamesData] = useState([]); // for get game data
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [UserOptionData, setUserOptionData] = useState("");
  const [Loading, setLoading] = useState(false);
  console.log(UserOptionData);
  console.log(GamesData);
  // show button if options are chess.com or Leechess
  useEffect(() => {
    if (selectedOption === "Chess" || selectedOption === "LeeChess.org") {
      // to hide and show button
      sethidesubmitbtn(true);
    } else {
      sethidesubmitbtn(false);
    }
  }, [selectedOption]);

  //Move Navigation Button
  const [game, setGame] = useState(new Chess());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isManualMove, setIsManualMove] = useState(false);
  const [notification, setNotification] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);

  const [,setManualMoves] = useState({});
  const [visibleMoves] = useState();

  // Function to check game status
  const checkGameStatus = () => {
    if (game.isCheckmate()) {
      setNotification("Checkmate! Game over.");
      toast.success("Checkmate! Game over.", { position: "top-center" });
    } else if (game.isCheck()) {
      setNotification("Check! Your king is in danger.");
      toast.warn("Check! Your king is in danger.", { position: "top-center" });
    } else if (game.isDraw()) {
      setNotification("Draw! The game is a draw.");
      toast.info("Draw! The game is a draw.", { position: "top-center" });
    } else {
      setNotification("");
    }
  };

  // fetch users from server
  const GetGamesfromServer = async (DateForFetchGames) => {
    await FetchgamesByDate({
      selectedOption,
      UserOptionData,
      DateForFetchGames,
      setGamesData,
      setLoading,
    });
  };

  // set date to fetch data from server
  useEffect(() => {
    if (selectedOption === "Chess") {
      const DateForFetchGames = {
        month: String(CurrentDate.getMonth() + 1).padStart(2, "0"),
        year: CurrentDate.getFullYear(),
      };
      setGamesData([]);
      GetGamesfromServer(DateForFetchGames);
    }

    if (selectedOption === "LeeChess.org") {
      const since = new Date(
        CurrentDate.getFullYear(),
        CurrentDate.getMonth(),
        1
      ).getTime();
      const until = new Date(
        CurrentDate.getFullYear(),
        CurrentDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      // return { since, until };
      const DateForFetchGames = {
        since,
        until,
      };
      setGamesData([]);
      // console.log(DateForFetchGames)
      GetGamesfromServer(DateForFetchGames);
    }
  }, [CurrentDate, showPopup]);

  // add one month in date
  const handleForwordMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // minus one month from date
  const handleBackwordMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  return (
    <div className="app-container bg-green-500 flex flex-col items-center justify-center container w-full mx-auto p-5">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row relative w-full max-w-4xl">
        {/* Chess Board Section with Player Labels */}
        <div className="relative w-full md:w-2/3 mb-5 md:mb-0">
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-t-lg">
            Black Player
          </div>
          <div className="chess-board-container p-3 bg-gray-100 rounded-lg">
            <ToastContainer />
            {notification && (
              <div className="notification-box">{notification}</div>
            )}            
            <Chessboard
              position={game.fen()}
              isManualMove={isManualMove}
              setIsManualMove={setIsManualMove}
              onPieceDrop={(sourceSquare, targetSquare) =>
                handleMove(
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
                )
              }
            />
          </div>
          <div className="w-full bg-gray-800 text-white text-center py-2 rounded-b-lg">
            White Player
          </div>
        </div>

        {/* Analysis Sidebar */}
        <div className="analysis-sidebar bg-black text-white p-4 ml-0 md:ml-4 rounded-lg w-full md:w-1/3 max-w-2xl flex flex-col justify-between overflow-auto ">
          <div className="relative">
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3">
              ♞ Game Report
            </button> */}
            <div className="flex justify-center gap-0.5 items-center">
              <input
                type="text"
                placeholder={
                  selectedOption === "Chess" ||
                  selectedOption === "LeeChess.org"
                    ? "Enter Username"
                    : selectedOption === "JSON"
                    ? "Enter JSON"
                    : "Enter PGN"
                }
                className="p-2 text-black w-full rounded mb-3"
                value={UserOptionData}
                onChange={(e) => {
                  setUserOptionData(e.target.value);
                }}
              />
              {hidesubmitbtn && (
                <button
                  onClick={() => {
                    setShowPopup(true);
                  }}
                  className="bg-green-400 p-1.5 text-xl mb-3 rounded-md"
                >
                  ➡️
                </button>
              )}
            </div>
            <select
              className="p-2 text-black w-full rounded mb-3"
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Pgn">Pgn</option>
              <option value="Chess">Chess.com</option>
              <option value="LeeChess.org">LeeChess.org</option>
              <option value="JSON">JSON</option>
            </select>

            {/* Unified Black Analysis Section */}

            <button
              onClick={() => AnalyseGame()}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3"
            >
              🔍 Analyze
            </button>
          </div>
          <div
            className="overflow-y-auto max-h-60 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3 h-16 flex">
              <h2 className="mr-1">Accuracies</h2>
              <b className="bg-white text-black h-8 rounded-md border-2 border-green-500 w-20 mr-1 text-center">
                92.09&#37;
              </b>
              <b className="bg-black h-8 rounded-md w-20 text-center border-2 border-green-500">
                76.98&#37;
              </b>
            </div>
            <div className="flex justify-center items-center  bg-gray-800 mb-2 rounded-lg">
              <MoveAnalysis />
            </div>
            <div className="mb-3">
              <ChessDataMoveList
                currentMoveIndex={currentMoveIndex}
                visibleMoves={visibleMoves}
              />
            </div>
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3 h-96">
              {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-gray-900 p-2 rounded-md"
                  >
                    <span className="text-gray-400">{index + 1}.</span>
                    {/* White move */}
                    <span className="text-white font-medium">
                      {moveHistory[index * 2]?.white || "-"}
                    </span>
                    {/* Black move */}
                    <span className="text-white font-medium">
                      {moveHistory[index * 2 + 1]?.black || "-"}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3 h-14 flex">
              <h3>Engine:</h3>
            </div>           
            <div>
              <ChessGraph positions={positions} />
            </div>
          </div>
          <div>
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
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 7h10v3l4-4l-4-4v3H5v6h2zm10 10H7v-3l-4 4l4 4v-3h12v-6h-2z"
                  />
                </svg>
              </button>
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              <button
                onClick={() =>
                  prevMove(                    
                    game,
                    setGame,
                    currentMoveIndex,
                    setCurrentMoveIndex,
                    isManualMove,
                    setIsManualMove,
                    checkGameStatus
                  )
                }
                disabled={isManualMove || currentMoveIndex === 0}
                className="bg-gray-700 p-1 rounded hover:bg-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"
                  />
                </svg>
              </button>

              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m10 17l5-5l-5-5z" />
                </svg>
              </button>
              <button
                onClick={() =>
                  nextMove(
                    game,
                    setGame,
                    currentMoveIndex,
                    setCurrentMoveIndex,
                    isManualMove,
                    setIsManualMove,
                    checkGameStatus
                  )
                }
                disabled={
                  isManualMove || currentMoveIndex >= gameData.moves.length * 2
                }
                className="bg-gray-700 p-1 rounded hover:bg-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                  />
                </svg>
              </button>
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m6 18l8.5-6L6 6zM16 6v12h2V6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg w-2/5">
            <h2 className="text-xl font-semibold text-center mb-3">
              Select a Game
            </h2>
            <div className="flex justify-around items-center mb-3">
              <button onClick={handleBackwordMonth}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"
                  />
                </svg>
              </button>

              <span>{`${String(CurrentDate.getMonth() + 1).padStart(
                2,
                "0"
              )}/${CurrentDate.getFullYear()}`}</span>

              <button onClick={handleForwordMonth}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                  />
                </svg>
              </button>
            </div>
            {/* Options Inside Popup */}
            <div>
              <div className="flex flex-col space-y-2 h-[50vh] overflow-auto">
                {Loading ? (
                  <div>Feaching Games...</div>
                ) : GamesData.length > 0 ? (
                  GamesData.map((game, index) => (
                    <button
                      key={index}
                      className="p-2 bg-gray-700 rounded text-left flex items-center gap-8 px-6"
                    >
                      <span className="text-base font-bold">
                        {game?.time_class || game.speed}
                      </span>{" "}
                      <span>
                        {game?.white?.username ||
                          game?.players?.white?.user?.name}{" "}
                        ({game?.players?.white?.rating || game?.white?.rating})
                        vs.{" "}
                        {game?.black?.username ||
                          game?.players?.black?.user?.name}{" "}
                        ({game?.players?.black?.rating || game?.white?.rating})
                      </span>
                    </button>
                  ))
                ) : (
                  <span>No Games Found</span>
                )}
              </div>
            </div>
            {/* Navigation Buttons */}
            {/* <div className="flex justify-center mt-3 space-x-2">
              <button className="p-2 bg-gray-700 rounded">←</button>
              <button className="p-2 bg-gray-700 rounded">→</button>
            </div> */}

            {/* Cancel Button */}
            <button
              className="mt-4 bg-gray-600 p-2 rounded w-full"
              onClick={() => {
                setShowPopup(false);
                setCurrentDate(new Date()); // to reset date when user reopen the card
              }}
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
