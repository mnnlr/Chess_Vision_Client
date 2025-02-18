import React, { useEffect, useRef, useState } from "react";




const ChessGraph = ({ positions, whitePlayer, blackPlayer }) => {
  const canvasRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const graphHeight = 80;
  const desiredGraphWidth = 250;
  const maxEval = 1100;
  const cpPerPixel = maxEval / (graphHeight / 2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = desiredGraphWidth;
    canvas.height = graphHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let baseBarWidth = Math.floor(desiredGraphWidth / positions.length);
    let remainderPixels = desiredGraphWidth - baseBarWidth * positions.length;
    let extraWidthPerBar = remainderPixels / positions.length;
    let cumulativeWidth = 0;

    positions.forEach((position, i) => {
      let topLine = position?.topLines?.find(line => line.id === 1);
      let evaluation = topLine?.evaluation;
      let currentBarWidth = baseBarWidth + Math.floor((i + 1) * extraWidthPerBar) - Math.floor(i * extraWidthPerBar);
      ctx.fillStyle = i === hoverIndex ? "#555555" : "#000000";
      ctx.fillRect(cumulativeWidth, 0, currentBarWidth, graphHeight);
      cumulativeWidth += currentBarWidth;

      if (evaluation?.type === "cp") {
        let height = graphHeight / 2 + evaluation.value / cpPerPixel;
        ctx.fillStyle = i === hoverIndex ? "#dddddd" : "#ffffff";
        ctx.fillRect(cumulativeWidth - currentBarWidth, graphHeight - height, currentBarWidth, height);
      }
    });

    // Midline
    ctx.beginPath();
    ctx.moveTo(0, graphHeight / 2);
    ctx.lineTo(desiredGraphWidth, graphHeight / 2);
    ctx.strokeStyle = "#ff5555";
    ctx.stroke();
  }, [hoverIndex, positions]);

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let cumulativeWidth = 0;
    let newHoverIndex = null;

    for (let i = 0; i < positions.length; i++) {
      let baseBarWidth = Math.floor(desiredGraphWidth / positions.length);
      let remainderPixels = desiredGraphWidth - baseBarWidth * positions.length;
      let extraWidthPerBar = remainderPixels / positions.length;
      let currentBarWidth = baseBarWidth + Math.floor((i + 1) * extraWidthPerBar) - Math.floor(i * extraWidthPerBar);

      if (x < cumulativeWidth + currentBarWidth) {
        newHoverIndex = i;
        break;
      }
      cumulativeWidth += currentBarWidth;
    }

    setHoverIndex(newHoverIndex);
    setMousePos({ x, y: event.clientY - rect.top });
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      {/* <h2>Chess Evaluation Graph</h2> */}
      <canvas ref={canvasRef} width={desiredGraphWidth} height={graphHeight} onMouseMove={handleMouseMove} />
      
      {hoverIndex !== null && positions[hoverIndex] && (
        <div
          style={{
            position: "absolute",
            left: mousePos.x - 10,
            top: mousePos.y - 40,
            background: "white",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid black",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
          }}
        >
          <img
            src={positions[hoverIndex].icon}
            alt="Move Type"
            style={{ width: "20px", height: "20px" }}
          />
          <strong>
            {/* {hoverIndex % 2 === 0 ? blackPlayer.username : whitePlayer.username} */}
          </strong>
        </div>
      )}
    </div>
  );
};

export default ChessGraph;
