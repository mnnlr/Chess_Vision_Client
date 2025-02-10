import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line
} from "recharts";

const data = [
  { move: 1, whiteEval: 0.5, blackEval: 0, category: "brilliant" },
  { move: 2, whiteEval: 0.2, blackEval: 0.3, category: "great" },
  { move: 3, whiteEval: 0.4, blackEval: 0, category: "best" },
  { move: 4, whiteEval: 0, blackEval: 0.6, category: "excellent" },
  { move: 5, whiteEval: 0.9, blackEval: 0, category: "good" },
  { move: 6, whiteEval: 0, blackEval: 0.3, category: "inaccuracy" },
  { move: 7, whiteEval: 0.7, blackEval: 0, category: "mistake" },
  { move: 8, whiteEval: 0, blackEval: 0.4, category: "blunder" },
  { move: 9, whiteEval: 0.6, blackEval: 0, category: "best" },
  { move: 10, whiteEval: 0, blackEval: 0.2, category: "great" },
  { move: 11, whiteEval: 0.3, blackEval: 0, category: "good" },
  { move: 12, whiteEval: 0, blackEval: 0.5, category: "mistake" },
  { move: 13, whiteEval: 0.4, blackEval: 0, category: "excellent" },
  { move: 14, whiteEval: 0, blackEval: 0.7, category: "blunder" },
  { move: 15, whiteEval: 0.8, blackEval: 0, category: "best" },
  { move: 16, whiteEval: 0, blackEval: 0.3, category: "inaccuracy" },
  { move: 17, whiteEval: 0.5, blackEval: 0, category: "great" },
  { move: 18, whiteEval: 0, blackEval: 0.9, category: "brilliant" },
  { move: 19, whiteEval: 0.7, blackEval: 0, category: "excellent" },
  { move: 20, whiteEval: 0, blackEval: 0.4, category: "good" },
  { move: 21, whiteEval: 0.6, blackEval: 0, category: "mistake" },
  { move: 22, whiteEval: 0, blackEval: 0.3, category: "best" },
  { move: 23, whiteEval: 0.2, blackEval: 0, category: "inaccuracy" },
  { move: 24, whiteEval: 0, blackEval: 0.7, category: "blunder" },
  { move: 25, whiteEval: 0.9, blackEval: 0, category: "brilliant" },
  { move: 26, whiteEval: 0, blackEval: 0.1, category: "excellent" },
  { move: 27, whiteEval: 0.4, blackEval: 0, category: "good" },
  { move: 28, whiteEval: 0, blackEval: 0.8, category: "mistake" },
  { move: 29, whiteEval: 0.6, blackEval: 0, category: "best" },
  { move: 30, whiteEval: 0, blackEval: 0.2, category: "great" },
  { move: 31, whiteEval: 0.3, blackEval: 0, category: "inaccuracy" },
  { move: 32, whiteEval: 0, blackEval: 0.9, category: "blunder" },
  { move: 33, whiteEval: 0.5, blackEval: 0, category: "brilliant" },
  { move: 34, whiteEval: 0, blackEval: 0.4, category: "excellent" },
  { move: 35, whiteEval: 0.8, blackEval: 0, category: "good" },
  { move: 36, whiteEval: 0, blackEval: 0.6, category: "best" },
  { move: 37, whiteEval: 0.2, blackEval: 0, category: "great" },
  { move: 38, whiteEval: 0, blackEval: 0.3, category: "mistake" },
  { move: 39, whiteEval: 0.7, blackEval: 0, category: "inaccuracy" },
  { move: 40, whiteEval: 0, blackEval: 0.8, category: "blunder" },
  { move: 41, whiteEval: 0.4, blackEval: 0, category: "best" },
  { move: 42, whiteEval: 0, blackEval: 0.5, category: "brilliant" },
  { move: 43, whiteEval: 0.6, blackEval: 0, category: "great" },
  { move: 44, whiteEval: 0, blackEval: 0.2, category: "excellent" },
  { move: 45, whiteEval: 0.9, blackEval: 0, category: "good" },
  { move: 46, whiteEval: 0, blackEval: 0.7, category: "mistake" },
  { move: 47, whiteEval: 0.3, blackEval: 0, category: "inaccuracy" },
  { move: 48, whiteEval: 0, blackEval: 0.4, category: "blunder" },
  { move: 49, whiteEval: 0.2, blackEval: 0, category: "best" },
  { move: 50, whiteEval: 0, blackEval: 0.6, category: "great" },
];

const moveData = {
  brilliant: { icon: "/icons/brilliant.png", color: "text-cyan-400" },
  great: { icon: "/icons/great.png", color: "text-blue-400" },
  best: { icon: "/icons/best.png", color: "text-green-400" },
  excellent: { icon: "/icons/excellent.png", color: "text-lime-400" },
  good: { icon: "/icons/good.png", color: "text-yellow-400" },
  inaccuracy: { icon: "/icons/inaccuracy.png", color: "text-orange-400" },
  mistake: { icon: "/icons/mistake.png", color: "text-red-400" },
  blunder: { icon: "/icons/blunder.png", color: "text-red-700" },
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const move = payload[0].payload;
    const moveInfo = moveData[move.category];

    return (
      <div className="bg-gray-900 text-white p-2 rounded-md shadow-md">
        <p className="font-bold">Move {move.move}</p>
        <p className={moveInfo.color}>{move.category}</p>
        <img src={moveInfo.icon} alt={move.category} className="w-6 h-6 mt-1" />
      </div>
    );
  }
  return null;
};

export default function ChessEvaluationChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        {/* <XAxis dataKey="move" /> */}
        <YAxis domain={[-1, 1]} />
        <Tooltip content={<CustomTooltip />} />

        {/* White Player Area */}
        <Area type="monotone" dataKey="whiteEval" stroke="white" fill="white" fillOpacity={0.7} />
        
        {/* Line for White Evaluation */}
        <Line type="monotone" dataKey="whiteEval" stroke="white" strokeWidth={2} dot={false} />
        
        {/* Line for Black Evaluation */}
        <Line type="monotone" dataKey="blackEval" stroke="black" strokeWidth={2} dot={false} />
        
        {/* Red Reference Line at Zero */}
        <ReferenceLine y={0} stroke="red" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
