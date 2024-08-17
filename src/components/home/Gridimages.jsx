import React from 'react';
import image1 from "../../images/download (4).jpeg"
import image2  from "../../images/download (5).jpeg"
import image3  from "../../images/download (6).jpeg"
function Gridimages() {
  return (
    <div className="mx-auto flex justify-center py-8">
      {/* Responsive Collage-style 3x3 Grid Structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-3xl w-full">
        {/* Large Image spanning two columns and two rows on large screens */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-gray-300">
          <img
            alt="Large Image"
            className="block h-full w-full object-cover object-center rounded-lg"
            src={image1}
          />
        </div>

        {/* Smaller images filling in the rest */}
        <div className="col-span-1 bg-gray-400">
          <img
            alt="Small Image 1"
            className="block h-full w-full object-cover object-center rounded-lg"
            src={image2}
          />
        </div>
        <div className="col-span-1 bg-gray-500">
          <img
            alt="Small Image 2"
            className="block h-full w-full object-cover object-center rounded-lg"
            src={image3}
          />
        </div>
      </div>
    </div>
  );
}

export default Gridimages;
