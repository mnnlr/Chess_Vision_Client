import React from "react";

const FriendsList = () => {
  return (
    <>
      {/* Friends List */}
      <div className="bg-customTeal text-white p-4 rounded-xl shadow-lg w-full lg:w-1/3">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center lg:text-left">
          Friends
        </h3>
        <div className="space-y-2">
          {["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"].map(
            (friend, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-green-500 rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-black p-1 sm:p-2 rounded-full">
                    <img
                      src="https://via.placeholder.com/32"
                      alt="Friend"
                      className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
                    />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">
                      {friend}
                    </div>
                    <div className="text-xs">Level 15</div>
                  </div>
                </div>
                <span className="text-xs">Online</span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
