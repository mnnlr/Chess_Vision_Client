import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

  const handleMove = (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', 
    });

    if (move === null) return false; 

    setPosition(game.fen());
    return true; 
  };

  return (
    <div style = {{display : 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop : '100px'}}>
        <div style = {{ width: '20%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor : 'lightgreen'}}></div>
    <div style={{ width: '40%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Chessboard
        position={position}
        onPieceDrop={handleMove}
      />
    </div>
    <div style = {{ width: '20%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor : 'lightgreen'}}></div>
    </div>
  );
};

export default ChessGame;
