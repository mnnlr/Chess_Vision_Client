import React from "react";
import img from "../images/images (7).jpeg";

const ContactUsForm = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
      {/* Left Side - Image Section */}
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="relative w-full h-full lg:h-[700px] rounded-xl overflow-hidden">
          <img
            src={img}
            alt="Chess piece"
            className="w-full h-auto md:h-full object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/100"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold">Contact us</h3>
            <p className="text-sm">Send us your details, we'll connect.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="md:w-1/2 w-full">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:customTeal bg-gray-100"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:customTeal bg-gray-100"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="mt-10 md:mt-6 lg:mt-10">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:customTeal bg-gray-100"
              placeholder="Email"
            />
          </div>

          <div className="mt-10 md:mt-6 lg:mt-10">
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:customTeal bg-gray-100"
              placeholder="Phone"
            />
          </div>

          <div className="mt-10 md:mt-6 lg:mt-10">
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:customTeal bg-gray-100"
              placeholder="Write your message here"
            ></textarea>
          </div>

          <div className="mt-10 md:mt-6 lg:mt-10">
            <button className="bg-customTeal text-white px-4 py-2 rounded-lg hover:bg-cyan-800 transition duration-300 ease-in-out">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
