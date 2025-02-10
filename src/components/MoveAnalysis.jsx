import React from "react";


const moveData = [
  
    { icon:"/icons/brilliant.png", category: "brilliant", count1: 0, count2: 0, color: "text-cyan-400" },
    { icon: "/icons/great.png", category: "great", count1: 0, count2: 1, color: "text-blue-400" },
    { icon: "/icons/best.png", category: "best", count1: 9, count2: 14, color: "text-green-400" },
    { icon: "/icons/excellent.png", category: "excellent", count1: 6, count2: 9, color: "text-lime-400" },
    { icon: "/icons/good.png", category: "good", count1: 7, count2: 4, color: "text-yellow-400" },
    { icon: "/icons/inaccuracy.png", category: "inaccuracy", count1: 1, count2: 0, color: "text-orange-400" },
    { icon: "/icons/mistake.png", category: "mistake", count1: 4, count2: 2, color: "text-red-400" },
    { icon: "/icons/blunder.png", category: "blunder", count1: 2, count2: 0, color: "text-red-700" }
  
];

const MoveAnalysis = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-64 border border-gray-700">
    <ul className="text-white">
      {moveData.map((move, index) => (
        <li key={index} className="flex justify-between items-center text-sm">
          <span className="text-gray-400">{move.count1}</span>
          <span className={`flex items-center gap-1 ${move.color} font-medium`}>
            <img src={process.env.PUBLIC_URL+move.icon}
                alt={move.category}
                className="w-4 h-4 rounded-full"/>
             {move.category}
          </span>
          <span className="text-gray-400">{move.count2}</span>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default MoveAnalysis;
