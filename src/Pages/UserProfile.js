import React from "react";
import img from '../images/download (10) - Copy.jpeg';
import FriendsList from "../components/FriendsList";

const UserProfile = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 p-4">
      {/* Main Profile Card */}
      <div className="bg-customTeal text-white p-6 rounded-xl shadow-lg w-full lg:w-2/3">
        {/* User Info */}
        <div className="flex flex-col items-center justify-between mb-6 lg:items-start lg:flex-row">
          <div className="flex items-center space-x-4 flex-col lg:flex-row">
            <div className="bg-black p-2 sm:p-4 rounded-full">
              <img
                src={img}
                alt="User"
                className="rounded-full h-24 w-24 sm:h-32 sm:w-32"
              />
            </div>
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold">John Doe</h2>
              <div className="text-sm">Level 23</div>
              <div className="bg-gray-300 rounded-full h-2 w-full mt-2">
                <div
                  className="bg-gray-800 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <div className="text-xs">Next Level</div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="bg-lime-500 p-4 rounded-lg shadow-lg w-full lg:h-64 lg:content-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2 lg:text-3xl" >Ranked Game</h3>
            <div className="flex justify-between">
              <div className="text-center ml-10">
                <div className="text-3xl sm:text-4xl font-bold">35</div>
                <div className="text-sm">Win</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">15</div>
                <div className="text-sm">Loss</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">3</div>
                <div className="text-sm">Draw</div>
              </div>
            </div>
          </div>
          <div className="bg-lime-500 p-4 rounded-lg shadow-lg w-full lg:h-64 lg:content-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2 lg:text-3xl">Local Game</h3>
            <div className="flex justify-between">
              <div className="text-center ml-10">
                <div className="text-3xl sm:text-4xl font-bold">315</div>
                <div className="text-sm">Win</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">135</div>
                <div className="text-sm">Loss</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">20</div>
                <div className="text-sm">Draw</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FriendsList />

    </div>
  );
};

export default UserProfile;
