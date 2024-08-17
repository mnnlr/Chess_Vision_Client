import React from "react";
import img from "../images/images (5) - Copy.jpeg";

import ContactUsForm from "../components/ContactUsForm";

const ContactUs = () => {
  return (
    <>

      <section className="relative bg-gray-800 text-white text-center py-10 md:py-20 mt-16 min-h-96 flex items-center justify-center">
        <img
          src={img}
          alt="Chess background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold">
          Contact
        </h2>
      </section>
      <ContactUsForm />
    </>
  );
};

export default ContactUs;
