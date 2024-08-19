import React from 'react'
import img from "../images/images (5) - Copy.jpeg";
import { AboutUsCards } from '../components/aboutUs/AboutUsCards';
import { AboutUsCard2 } from '../components/aboutUs/AboutUsCard2';
import { AboutUsCard3 } from '../components/aboutUs/AboutUsCard3';
// import cardImg from '../images/download (8) - Copy.jpeg'
import cardImg from '../images/avf7738nm.png'
import cardImg1 from '../images/images (7).jpeg'
import cardImg2 from '../images/images (8) - Copy.jpeg'
import emp1 from '../images/download (9) - Copy.jpeg'
import emp2 from '../images/images (9) - Copy.jpeg'
import emp3 from '../images/download (10) - Copy.jpeg'


export const AboutUs = () => {
    return (
        <>
            <section className="relative bg-gray-800 text-white text-center py-10 md:py-20 min-h-96 flex items-center justify-center">
                <img
                    src={img}
                    alt="Chess background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className=''>
                    <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold">
                        About Us
                    </h2>
                    <h2 className="relative text-sm sm:text-4xl md:text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    </h2>
                </div>
            </section>
            <AboutUsCards img={cardImg} title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" />
            <AboutUsCard2 img1={cardImg1} img2={cardImg2} title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" />
            <AboutUsCard3
                heading={"Meet Our Team"}

                img1={emp1}
                title1={"Lorem ipsum"}
                description1={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}

                img2={emp2}
                title2={"Lorem ipsum"}
                description2={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}

                img3={emp3}
                title3={"Lorem ipsum"}
                description3={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />
        </>
    )
}
