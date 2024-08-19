import React from 'react'

export const AboutUsCard2 = ({ title, description, img1, img2 }) => {
    return (
        <section className="py-8">
            <div className="container mx-auto flex flex-wrap justify-center pb-10">
                <div className="flex flex-col md:flex-row w-full max-w-4xl">
                    <div className="md:w-1/2 p-4 items-center justify-center flex flex-col ">
                        <h3 className="text-4xl font-bold text-gray-800">
                            {title}
                        </h3>
                        <p className="mt-1 text-2xl text-gray-500">
                            {description}
                        </p>
                    </div>
                    <div className="relative w-full md:ml-6 md:w-1/2 overflow-hidden">
                        <div className="w-full md:w-1/2">
                            <img
                                className="rounded-2xl absolute top-3 left-10 block z-10 object-cover shadow-xl object-center w-32 md:w-40 lg:w-48"
                                src={img1}
                                alt="Card Image"
                            />
                            <img
                                className="absolute rounded-2xl bottom-0 right-0 w-48 h-auto md:w-60 lg:w-72 z-0 object-cover object-center"
                                src={img2}
                                alt="Card Image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
