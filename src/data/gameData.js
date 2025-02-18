// export const gameData = {
//     "gameId": "987654",
//     "players": {
//       "white": { "name": "Magnus Carlsen", "rating": 2850 },
//       "black": { "name": "Hikaru Nakamura", "rating": 2780 }
//     },
//     "moves": [
//       {
//         "moveNumber": 1,
//         "whiteMove": { "notation": "e4", "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", "evaluation": "best", "icon": "/icons/best.png" },
//         "blackMove": { "notation": "e5", "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2", "evaluation": "best", "icon": "/icons/best.png" }
//       },
//       {
//         "moveNumber": 2,
//         "whiteMove": { "notation": "Nf3", "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2", "evaluation": "great", "icon": "/icons/great.png" },
//         "blackMove": { "notation": "Nc6", "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3", "evaluation": "excellent", "icon": "/icons/excellent.png" }
//       },
//       {
//         "moveNumber": 3,
//         "whiteMove": { "notation": "Bb5", "fen": "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3", "evaluation": "best", "icon": "/icons/best.png" },
//         "blackMove": { "notation": "a6", "fen": "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq a6 0 4", "evaluation": "good", "icon": "/icons/good.png" }
//       },
//       {
//         "moveNumber": 4,
//         "whiteMove": { "notation": "Ba4", "fen": "r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4", "evaluation": "best", "icon": "/icons/best.png" },
//         "blackMove": { "notation": "Nf6", "fen": "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5", "evaluation": "excellent", "icon": "/icons/excellent.png" }
//       },
//       {
//         "moveNumber": 5,
//         "whiteMove": { "notation": "O-O", "fen": "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 3 5", "evaluation": "brilliant", "icon": "/icons/brilliant.png" },
//         "blackMove": { "notation": "Be7", "fen": "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6", "evaluation": "inaccuracy", "icon": "/icons/inaccuracy.png" }
//       },
//       {
//         "moveNumber": 6,
//         "whiteMove": { "notation": "Re1", "fen": "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 b kq - 5 6", "evaluation": "best", "icon": "/icons/best.png" },
//         "blackMove": { "notation": "b5", "fen": "r1bqk2r/2ppbppp/p1n2n2/1p2p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 w kq b6 0 7", "evaluation": "blunder", "icon": "/icons/blunder.png" }
//       },
//       {
//         "moveNumber": 7,
//         "whiteMove": { "notation": "Bb3", "fen": "r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 b kq - 1 7", "evaluation": "good", "icon": "/icons/good.png" },
//         "blackMove": { "notation": "d6", "fen": "r1bqk2r/2p1bppp/p1np1n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 w kq - 2 8", "evaluation": "great", "icon": "/icons/great.png" }
//       }
//     ],
//     "result": "1-0",
//     "summary": {
//       "brilliant": 1,
//       "great": 2,
//       "best": 4,
//       "excellent": 2,
//       "good": 2,
//       "inaccuracy": 1,
//       "mistake": 0,
//       "blunder": 1
//     }
//   };
export const gameData = {
    "gameId": "987654",
    "players": {
      "white": { "name": "Magnus Carlsen", "rating": 2850 },
      "black": { "name": "Hikaru Nakamura", "rating": 2780 }
    },
    "moves": [
      {
        "moveNumber": 1,
        "whiteMove": { "notation": "e4", "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", "evaluation": "best","icon": "/icons/best.png" },
        "blackMove": { "notation": "e5", "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2", "evaluation": "best", "icon": null }
      },
      {
        "moveNumber": 2,
        "whiteMove": { "notation": "Nf3", "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2", "evaluation": "best" },
        "blackMove": { "notation": "Nc6", "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3", "evaluation": "best" }
      },
      {
        "moveNumber": 3,
        "whiteMove": { "notation": "Bb5", "fen": "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3", "evaluation": "good" },
        "blackMove": { "notation": "a6", "fen": "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq a6 0 4", "evaluation": "solid" }
      },
      {
        "moveNumber": 4,
        "whiteMove": { "notation": "Ba4", "fen": "r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4", "evaluation": "good" },
        "blackMove": { "notation": "Nf6", "fen": "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5", "evaluation": "best" }
      },
      {
        "moveNumber": 5,
        "whiteMove": { "notation": "O-O", "fen": "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 3 5", "evaluation": "best" },
        "blackMove": { "notation": "Be7", "fen": "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6", "evaluation": "solid" }
      },
      {
        "moveNumber": 6,
        "whiteMove": { "notation": "Re1", "fen": "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 b kq - 5 6", "evaluation": "best" },
        "blackMove": { "notation": "b5", "fen": "r1bqk2r/2ppbppp/p1n2n2/1p2p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 w kq b6 0 7", "evaluation": "aggressive" }
      },
      {
        "moveNumber": 7,
        "whiteMove": { "notation": "Bb3", "fen": "r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 b kq - 1 7", "evaluation": "solid" },
        "blackMove": { "notation": "d6", "fen": "r1bqk2r/2p1bppp/p1np1n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 w kq - 0 8", "evaluation": "stable" }
      },
      {
        "moveNumber": 8,
        "whiteMove": { "notation": "c3", "fen": "r1bqk2r/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 b kq - 0 8", "evaluation": "good" },
        "blackMove": { "notation": "O-O", "fen": "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 1 9", "evaluation": "best" }
      },
      {
        "moveNumber": 9,
        "whiteMove": { "notation": "h3", "fen": "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 b - - 0 9", "evaluation": "solid" },
        "blackMove": { "notation": "Na5", "fen": "r1bq1rk1/2p1bppp/p2p1n2/np2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 1 10", "evaluation": "aggressive" }
      },
      {
        "moveNumber": 10,
        "whiteMove": { "notation": "Bc2", "fen": "r1bq1rk1/2p1bppp/p2p1n2/np2p3/4P3/2P2N1P/PPBP1PP1/RNBQR1K1 b - - 2 10", "evaluation": "stable" },
        "blackMove": { "notation": "c5", "fen": "r1bq1rk1/4bppp/p2p1n2/npp1p3/4P3/2P2N1P/PPBP1PP1/RNBQR1K1 w - c6 0 11", "evaluation": "dynamic" }
      },
      {
        "moveNumber": 11,
        "whiteMove": { "notation": "d4", "fen": "r1bq1rk1/4bppp/p2p1n2/npp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1 b - d3 0 11", "evaluation": "strong" },
        "blackMove": { "notation": "Qc7", "fen": "r1b2rk1/2q1bppp/p2p1n2/npp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1 w - - 1 12", "evaluation": "balanced" }
      }
    ]
    
  
  };