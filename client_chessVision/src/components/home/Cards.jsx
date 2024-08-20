import React from 'react';
import camera from "../../images/transparent-camera-lens-5e2719f91f7f26.258870421579620857129.png";
import chess from '../../images/5a353d1cc50827.4970413315134384928071.png'
import robot from "../../images/transparent-robot-face-robot-blue-eyes-digital-art-man-mans-face-with-robot-headpiece-digital-style65fd4933cdd078.00530967.png"
function Cards() {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex flex-wrap justify-center gap-6">
                <h1 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
                    Features
                </h1>

                <div class="flex flex-col rounded-2xl w-56 bg-[#ffffff] shadow-xl">
                    <figure class="flex justify-center items-center rounded-2xl">
                        <img src={camera} alt="Card Preview" class="rounded-t-2xl object-contain h-48 w-96" />
                    </figure>
                    <div class="flex flex-col p-8">
                        <div class="text-2xl font-bold   text-[#374151] pb-6">Generator</div>
                        <div class=" text-lg   text-[#374151]">Leverage a graphical editor to create beautiful web components.</div>
                    </div>
                </div>

                {/* Card 2 */}
                <div class="flex flex-col rounded-2xl w-56 bg-[#ffffff] shadow-xl">
                    <figure class="flex justify-center items-center rounded-2xl">
                        <img src={chess}  alt="Card Preview" class="rounded-t-2xl object-contain h-48 w-96" />
                    </figure>
                    <div class="flex flex-col p-8">
                        <div class="text-2xl font-bold   text-[#374151] pb-6">Generator</div>
                        <div class=" text-lg   text-[#374151]">Leverage a graphical editor to create beautiful web components.</div>
                    </div>
                </div>

                {/* Card 3 */}
                <div class="flex flex-col rounded-2xl w-56 bg-[#ffffff] shadow-xl">
                    <figure class="flex justify-center items-center rounded-2xl">
                        <img src={robot} alt="Card Preview" class="rounded-t-2xl object-contain h-48 w-96" />
                    </figure>
                    <div class="flex flex-col p-8">
                        <div class="text-2xl font-bold   text-[#374151] pb-6">Generator</div>
                        <div class=" text-lg   text-[#374151]">Leverage a graphical editor to create beautiful web components.</div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Cards;
