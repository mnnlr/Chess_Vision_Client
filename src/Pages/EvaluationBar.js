import React, { useEffect, useRef } from "react";

const EvaluationBar = ({ evaluation }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Normalize evaluation (-10 to +10) to a percentage (0% to 100%)
    // Positive evaluation favors White (white portion grows from top), negative favors Black (black portion grows from bottom)
    const evalRange = 10; // Max evaluation range
    const normalizedEval = (evaluation + evalRange) / (2 * evalRange); // Maps -10 to +10 to 0 to 1
    const evalPercentage = normalizedEval * 100; // Convert to 0% to 100%

    // Clear canvas and set background
    ctx.fillStyle = "#d3d3d3"; // Gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw White advantage (top portion, if evaluation >= 0)
    if (evaluation >= 0) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height * (evalPercentage / 100));
    }

    // Draw Black advantage (bottom portion, if evaluation <= 0)
    if (evaluation <= 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, canvas.height * (1 - Math.abs(evalPercentage / 100)), canvas.width, canvas.height * Math.abs(evalPercentage / 100));
    }

    // Draw evaluation value on canvas for clarity
    ctx.fillStyle = "gray";
    ctx.font = "12px Arial";
    ctx.fillText(evaluation.toFixed(2), 5, 20); // Display evaluation value
  }, [evaluation]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={24} height={400} className="bg-gray-300 rounded-lg" />
      <p className="text-sm mt-2">{evaluation.toFixed(2)}</p>
    </div>
  );
};

export default EvaluationBar;