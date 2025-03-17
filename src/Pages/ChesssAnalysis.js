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
import { handleMove } from "../utils/chessUtils"; // Import move handlers
import ChessDataMoveList from "../utils/ChessDataMoveList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parsePGN } from "../utils/pgnUtils";
import { parsePGNInput } from "../utils/pgnUtils";
import "../css/loader.css"

const ChessAnalysis = ({ setMoves = () => {} }, pgn) => {
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const [showPopup, setShowPopup] = useState(false); // Control modal visibility
  const [hidesubmitbtn, sethidesubmitbtn] = useState(false); // for show and hide button
  const [GamesData, setGamesData] = useState([{ moves: [] }]); // for get game data
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [UserOptionData, setUserOptionData] = useState("");
  const [Loading, setLoading] = useState(false);
  console.log(UserOptionData);
  const [showGameInfo, setShowGameInfo] = useState(true);
  // console.log(GamesData);
  // show button if options are chess.com or Leechess
  useEffect(() => {
    if (selectedOption === "Chess" || selectedOption === "LeeChess.org") {
      // to hide and show button
      sethidesubmitbtn(true);
    } else {
      sethidesubmitbtn(false);
    }
  }, [selectedOption]);

  //Moves Navigation
  const [game, setGame] = useState(new Chess());
  useEffect(() => {
    if (game) {
      checkGameStatus();
    }
  }, [game]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isManualMove, setIsManualMove] = useState(false);
  const [notification, setNotification] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [, setManualMoves] = useState({});
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

  //Fist and Last move Navigation
  const FirstMove = () => {
    setCurrentMoveIndex(0);
    updateBoardPosition(0);
  };

  const LastMove = () => {
    if (!selectedGame || selectedGame.moves.length === 0) return;

    const lastMove = selectedGame.moves[selectedGame.moves.length - 1];
    const lastMoveIndex = lastMove.blackMove
      ? selectedGame.moves.length * 2 - 1
      : selectedGame.moves.length * 2 - 2;

    setCurrentMoveIndex(lastMoveIndex);
    updateBoardPosition(lastMoveIndex);
  };

  const updateBoardPosition = (index) => {
    if (index < 0 || index >= selectedGame.moves.length * 2) return;

    const moveIndex = Math.floor(index / 2);
    const move = selectedGame.moves[moveIndex];

    if (move) {
      const fen = index % 2 === 0 ? move.whiteMove?.fen : move.blackMove?.fen;

      if (fen) {
        const newGame = new Chess();
        newGame.load(fen);
        setGame(newGame);
      }
    }
  };

  // fetch users from server
  const GetGamesfromServer = async (DateForFetchGames) => {
    if ((selectedOption === "Chess" || selectedOption === "LeeChess.org") && !UserOptionData.trim()) {
      toast.error("Username is required for Chess.com & Lichess!", {
        autoClose: 3000,
      });
      return; // Stop execution if username is missing
    }
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

  // fetch moves data from chess.com & LeeChess.com
  const handleDataApi = (game) => {
    console.log("Received game object:", game);
    toast.success("Game data loaded successfully!", {
      autoClose: 2000,
    });
    if (
      !game ||
      !game.pgn ||
      typeof game.pgn !== "string" ||
      !game.pgn.trim()
    ) {
      console.log("Error:Game data missing or no PGN", game);
      toast.error("PGN data is missing or invalid!", { autoClose: 3000 });
      return;
    }
    console.log("PGN is valid:", game.pgn);
    const extractedMoves = parsePGN(game.pgn);
    if (!extractedMoves || extractedMoves.length === 0) {
      console.error("Error: Failed to extract move from PNG");
      toast.error("No valid moves found in PGN!", { autoClose: 3000 });

      return;
    }
    const formattedMoves = extractedMoves.reduce((acc, move, index) => {
      if (index % 2 === 0) {
        acc.push({
          moveNumber: move.moveNumber,
          whiteMove: move.whiteMove,
          blackMove: extractedMoves[index + 1]?.blackMove || null,
        });
      }
      return acc;
    }, []);

    console.log("Formatted Moves:", formattedMoves);

    setGamesData([
      {
        white: {
          username:
            game?.white?.username ||
            game?.players?.white?.user?.name ||
            "Unknown",
          rating: game?.white?.rating || game?.players?.white?.rating || "N/A",
        },
        black: {
          username:
            game?.black?.username ||
            game?.players?.black?.user?.name ||
            "Unknown",
          rating: game?.black?.rating || game?.players?.black?.rating || "N/A",
        },
        moves: formattedMoves,
        timeControl: game.time_control || game.timeControl || "Unknow",
        gameUrl: game.url || game.gameUrl || "N/A",
        pgn: game.pgn,
      },
    ]);

    setSelectedGame({
      moves: formattedMoves,
      gameUrl: game.gameUrl,
      whiteUsername: game?.white?.username || game?.players?.white?.user?.name || "Unknown",
      blackUsername: game?.black?.username || game?.players?.black?.user?.name || "Unknown",
      timeControl: game?.timeControl || "Unknown",
      whiteRating: game?.white?.rating || game?.players?.white?.rating || "N/A",
      blackRating: game?.black?.rating || game?.players?.black?.rating || "N/A",
    });

    setGamesData([
      {
        moves: formattedMoves,
        gameUrl: game.gameUrl,
        whiteUsername: game?.white?.username || game?.players?.white?.user?.name || "Unknown",
        blackUsername: game?.black?.username || game?.players?.black?.user?.name || "Unknown",
        timeControl: game?.timeControl || "Unknown",
        whiteRating: game?.white?.rating || game?.players?.white?.rating || "N/A",
        blackRating: game?.black?.rating || game.players?.black?.rating || "N/A",
      },
    ]);
    setLoading(false);
    setShowPopup(false);
    resetChessBoard();
  };

  //Fetch PGN via input
  const handlePGNChange = (event) => {
    const pgnData = event?.target?.value || UserOptionData; // Get PGN from input or state
    if (selectedOption === "pgn") {
    if (!pgnData || typeof pgnData !== "string" || !pgnData.trim()) {
      toast.error("Input field empty or PGN data not found!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  }

    // Extract metadata & clean PGN
    const metadataRegex = /\[.*?\]/g;
    const metadata = pgnData.match(metadataRegex);
    let movesOnlyPGN = pgnData
      .replace(metadataRegex, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!movesOnlyPGN) {
      // toast.error("No valid moves found in PGN!");
      return;
    }
    //Normalize castling notation (handles different hyphen styles)
    movesOnlyPGN = movesOnlyPGN
      .replace(/\b0[\-‐]0\b/g, "O-O")
      .replace(/\b0[\-‐]0[\-‐]0\b/g, "O-O-O");

    //Remove game result (1-0, 0-1, ½-½, etc.)
    movesOnlyPGN = movesOnlyPGN.replace(/\b(1-0|0-1|½-½|\*)\b/g, "").trim();

    if (
      !movesOnlyPGN.match(/\b[a-h][1-8]\b/) &&
      !movesOnlyPGN.match(/\b[NBRQK][a-h1-8]?\b/)
    ) {
      console.error("Error: PGN does not contain recognizable chess moves!");      
      toast.error("PGN does not contain recognizable chess moves!", {
        position: "top-right",
        autoClose: 3000,
    });

      return;
    }
    const game = {
      pgn: movesOnlyPGN,
      metadata: metadata || [],
    };


    toast.success("PGN successfully loaded!", {
      position: "top-right",
      autoClose: 3000,
  });
    handlePGNInput(game);
  };

  const handlePGNInput = (game) => {
    if (
      !game ||
      !game.pgn ||
      typeof game.pgn !== "string" ||
      !game.pgn.trim()
      
    ) {
      console.error("Error: Game data missing or not PGN paste!");
      toast.error("No valid moves found in PGN!");
      
      return;
    }

    const extractedMoves = parsePGNInput(game.pgn);
    if (!extractedMoves || extractedMoves.length === 0) {      
      return;
    }
    setGamesData([
      {
        white: {
          username: game?.white?.username || "Unknown",
          rating: game?.white?.rating || "N/A",
        },
        black: {
          username: game?.black?.username || "Unknown",
          rating: game?.black?.rating || "N/A",
        },
        moves: extractedMoves,
        timeControl: game.time_control || "Unknown",
        gameUrl: game.url || "N/A",
        pgn: game.pgn,
      },
    ]);

    setSelectedGame({
      moves: extractedMoves,
      gameUrl: game.gameUrl || "N/A",
      whiteUsername: game?.white?.username || "Unknown",
      blackUsername: game?.black?.username || "Unknown",
      timeControl: game?.timeControl || "Unknown",
      whiteRating: game?.white?.rating || "N/A",
      blackRating: game?.black?.rating || "N/A",
    });
  };
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
  // Reset Chess Board Moves
  const resetChessBoard = () => {
    const newGame = new Chess();
    setGame(newGame);
    setMoves([]);
    setManualMoves([]);
    setCurrentMoveIndex(0);
    setMoveHistory([]);
    setIsManualMove(false);
  };

  const handleAnalyzeClick = () => {
    if(!selectedGame){
      toast.error('No game selected!', {autoClose: 3000});      
      return
    }
    setLoading(true);
    resetChessBoard();
    setShowGameInfo(false);
    setGamesData([selectedGame]);

    if (selectedOption === "Chess" || selectedOption === "LeeChess.org") {
      handleDataApi(selectedGame);
      setLoading(false)
      return;
    }
      
    if (selectedOption === "pgn") {
      if (!UserOptionData || !UserOptionData.trim()) {
        toast.error("Input field empty or PGN data not found!", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }
      // Call handlePGNChange to process the input first
      const pgnData = { target: { value: UserOptionData } };
      handlePGNChange(pgnData);
    } else {
      AnalyseGame();
    }
    setLoading(false);
  };
  

  return (
    <div className="app-container bg-green-500 flex flex-col items-center justify-center container w-full mx-auto p-5">
      <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row relative w-full max-w-4xl">
        {/* Chess Board Section with Player Labels */}
        <div className="relative w-full md:w-2/3 mb-5 md:mb-0">
          {selectedGame ? (
            <div className="w-full bg-gray-800 text-white py-2 rounded-t-lg text-left">
              <p className="ml-3">
                {selectedGame.blackUsername} (
                {selectedGame.blackRating || "N/A"}){" "}
              </p>
            </div>
          ) : (
            <div className="w-full bg-gray-800 text-white text-left py-2 rounded-t-lg">
              <p className="ml-3">No game selected.</p>
            </div>
          )}
          <div className="chess-board-container p-3 bg-gray-100 rounded-lg">
            <ToastContainer />
            {notification && (
              <div className="notification-box">{notification}</div>
            )}
            <Chessboard
              // boardWidth={470}
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
          {selectedGame ? (
            <div className="w-full bg-gray-800 text-white text-left py-2 rounded-b-lg">
              <p className="ml-3">
                {selectedGame.whiteUsername} (
                {selectedGame.whiteRating || "N/A"})
              </p>
            </div>
          ) : (
            <div className="w-full bg-gray-800 text-white text-left py-2 rounded-b-lg">
              <p className="ml-3">No game selected.</p>
            </div>
          )}
        </div>

        {/* Analysis Sidebar */}
        <div className="analysis-sidebar bg-black text-white p-4 ml-0 md:ml-4 rounded-lg w-full md:w-1/3 max-w-2xl flex flex-col justify-between overflow-auto">
          <div className="relative order-last md:order-first sm:order-first">
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
                  const newValue = e.target.value;
                  setUserOptionData(newValue.trim());                  
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
              onChange={(e) => {
                const value = e.target.value;
                setSelectedOption(value);
                setUserOptionData("");
                if (value === "Chess" || value === "LeeChess.org") {
                  toast.info("Please enter a username to fetch games.", {
                    autoClose: 3000,
                  });
                  // handleAnalyzeClick();
                }
              }}
            >
              <option value="">Select an option</option>
              <option value="pgn">Pgn</option>
              <option value="Chess">Chess.com</option>
              <option value="LeeChess.org">LeeChess.org</option>
              <option value="JSON">JSON</option>
            </select>

            {/* Unified Black Analysis Section */}

            <button
            onClick={handleAnalyzeClick} disabled={Loading}                    
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3"
            >
              {Loading ? <span className="loader"></span> : " 🔍 Analyze"}
              
            </button>
          </div>
          {showGameInfo && (
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3 h-auto flex">
          <div className="text-sm">
              {selectedGame ? (
                <>
                  <p><strong>Time Control: </strong> {selectedGame.time_control}</p>
                  <p><strong>Game Type: </strong> {selectedGame.time_class}</p>
                  <p><strong>Rated: </strong> {selectedGame.rated ? "Yes" : "No"}</p>
                  <p><strong>Start Time: </strong> {new Date(selectedGame.end_time * 1000).toLocaleString()}</p>

                  <h4>Players:</h4>
                  <p><strong>White: </strong> {selectedGame?.white?.username ||selectedGame?.players?.white?.user?.name || "Unknown" } ({selectedGame?.white?.rating || selectedGame?.players?.white?.rating || "N/A"})</p>
                  <p><strong>Black: </strong> {selectedGame?.black?.username ||selectedGame?.players?.black?.user?.name || "Unknown" } ({selectedGame?.black?.rating || selectedGame?.players?.black?.rating || "N/A"})</p>
                </>
              ) : (
                <div className=" text-red-500 p-5 rounded-lg text-lg w-full mb-3 flex text-center ml-5">No game selected!</div>
              )}
            </div>

            </div>
            )}
            {!showGameInfo &&(
          <div
            className="overflow-y-auto max-h-60 scrollbar-none order-2 md:order-none sm:order-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3 h-16 flex ">
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
                gameData={selectedGame || { moves: parsePGN(pgn) }}
                visibleMoves={visibleMoves}
              />
            </div>
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3 h-auto overflow-auto">
              {moveHistory.length > 0 ? (
                Array.from({ length: Math.ceil(moveHistory.length / 2) }).map(
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
                )
              ) : (
                <div className="text-center text-sm text-gray-400 py-2">
                  No manual move available
                </div>
              )}
            </div>

            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg font-semibold w-full mb-3 h-14 flex">
              <h3>Engine:</h3>
            </div>
            <div>
              <ChessGraph positions={positions} />
            </div>
          </div>
          )}
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
            <div className="bg-gray-800 p-3 rounded-lg flex justify-between md:flex-row gap-2 mb-3 items-center w-full order-first md:order-last sm:-order-last">  
              <button className="bg-gray-700 p-1 rounded hover:bg-gray-600 md:w-auto
              ">
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
              <button
                onClick={() => FirstMove(setCurrentMoveIndex)}
                className="bg-gray-700 p-1 rounded hover:bg-gray-600"
              >
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
                    selectedGame,
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
              <button
                onClick={() =>
                  nextMove(
                    game,
                    setGame,
                    currentMoveIndex,
                    setCurrentMoveIndex,
                    isManualMove,
                    setIsManualMove,
                    selectedGame,
                    checkGameStatus
                  )
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
              <button
                onClick={() => LastMove(setCurrentMoveIndex)}
                className="bg-gray-700 p-1 rounded hover:bg-gray-600"
              >
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
                      onClick={() => {
                        setSelectedGame(game)
                        setShowPopup(false);
                      }}
                      className="p-2 bg-gray-700 rounded text-left flex items-center gap-8 px-6"
                    >
                      Game {index + 1}
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
