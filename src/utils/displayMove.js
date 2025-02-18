export const displayMove = (from, to, notation, fen, setMoveHistory) => {
  const moveText = `${from}-${to}`;

  setMoveHistory((prevHistory) => {
    if (!Array.isArray(prevHistory)) {
      prevHistory = [];
    }

    const moveIndex = prevHistory.length;
    const isWhiteMove = moveIndex % 2 === 0; // Even index = White, Odd index = Black

    const newMove = {
      white: isWhiteMove ? from : prevHistory[moveIndex - 1]?.white || "",
      black: isWhiteMove ? "" : to,
      fen: fen,
    };

    return [...prevHistory, newMove];
  });

  console.log("Move History:", moveText);
};
