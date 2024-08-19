import React from 'react'

export const AboutUsCards = ({ title, description, img }) => {
    return (
        <section className="py-8">
            <div className="container mx-auto flex flex-wrap justify-center pb-10">
                <div className="flex flex-col md:flex-row w-full max-w-4xl">
                    <div className="relative w-full md:w-1/2 overflow-hidden">
                        <img
                            className="block h-full w-full object-cover object-center"
                            src={img}
                            alt="Card Image"
                        />
                    </div>
                    <div className="p-4 items-center md:ml-6 justify-center flex flex-col md:w-1/2">
                        <h3 className="text-4xl font-bold text-gray-800">
                            {title}
                        </h3>
                        <p className="mt-1 text-2xl text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
