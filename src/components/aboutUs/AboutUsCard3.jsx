import React from 'react'

export const AboutUsCard3 = ({ heading, img1, img2, img3, title1, title2, title3, description1, description2, description3 }) => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex flex-wrap justify-center gap-6">
                <h1 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
                    {heading}
                </h1>

                <div className='gap-6 flex flex-wrap justify-center'>
                    {/* Card 1 */}
                    <div className="flex flex-col rounded-2xl w-56 bg-[#ffffff] shadow-xl">
                        <figure className="flex justify-center items-center rounded-2xl">
                            <img src={img1} alt="Card Preview" className="rounded-2xl object-contain h-48 w-96" />
                        </figure>
                        <div className="flex flex-col p-8">
                            <div className="text-2xl font-bold   text-[#374151] pb-6">{title1}</div>
                            <div className=" text-lg   text-[#374151]">{description1}</div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex flex-col rounded-2xl w-56 bg-[#ffffff] shadow-xl">
                        <figure className="flex justify-center items-center rounded-2xl">
                            <img src={img2} alt="Card Preview" className="rounded-t-2xl object-contain h-48 w-96" />
                        </figure>
                        <div className="flex flex-col p-8">
                            <div className="text-2xl font-bold   text-[#374151] pb-6">{title2}</div>
                            <div className=" text-lg   text-[#374151]">{description2}</div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex flex-col rounded-2xl w-56 bg-[#ffffff] shadow-xl">
                        <figure className="flex justify-center items-center rounded-2xl">
                            <img src={img3} alt="Card Preview" className="rounded-t-2xl object-contain h-48 w-96" />
                        </figure>
                        <div className="flex flex-col p-8">
                            <div className="text-2xl font-bold   text-[#374151] pb-6">{title3}</div>
                            <div className=" text-lg   text-[#374151]">{description3}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
