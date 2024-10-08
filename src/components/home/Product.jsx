import React from 'react';
import chessimage from "../../images/download (3).jpeg";

function Product({ title, description }) {
  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap justify-center pt-4 pb-10">
        <div className="bg-white border rounded-xl shadow-sm flex flex-col md:flex-row dark:bg-neutral-600 dark:border-neutral-700 dark:shadow-neutral-700/70 w-full max-w-4xl">
          {/* Image */}
          <div className="relative w-full md:w-1/2 rounded-t-xl md:rounded-l-xl overflow-hidden">
            <img
              className="block h-full w-full object-cover object-center"
              src={chessimage}
              alt="Card Image"
            />
          </div>
          {/* Content */}
          <div className="p-4 flex flex-col justify-center md:w-1/2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-gray-500 dark:text-neutral-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
