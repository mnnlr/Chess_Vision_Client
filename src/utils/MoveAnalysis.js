import React from "react";
import {moveData} from "../data/MoveEvaluation"



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
