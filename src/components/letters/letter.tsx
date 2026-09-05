"use client";

import {useStore} from "@/store/store";
import Image from "next/image";
import {ValidLetterDate} from "@/enums/common";


const Letter = () => {
    const {
        activeLetter,
        setActiveLetter,
        galleryLetter,
        showLetter,
        setShowLetter,
    } = useStore();

    return (
        <>
            <div
                className={`z-50 fixed top-1/2 -translate-y-1/2 left-0 backdrop-blur-2xl w-screen h-screen flex overflow-clip px-2 py-6 lg:py-2 transition-all duration-700 ease-in-out ${showLetter ? "opacity-100" : "select-none pointer-events-none opacity-0"}`}>
                <div
                    className={`bg-amber-100 h-[95vh] relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 left-1/2 text-black text-3xl font-fleur-de-leah max-w-172 flex transition-all duration-500 ease-in-out ${galleryLetter ? "opacity-0 select-none pointer-events-none lg:pointer-events-auto lg:select-auto lg:opacity-100 -translate-x-1/2 lg:-translate-x-[135%]" : "-translate-x-1/2"}`}>
                    <Image src={"/images/textures/old-paper.jpg"} alt={"Old coffee stained paper texture."} width={2000}
                           height={2000} quality={100} priority
                           className="absolute top-0 left-0 opacity-50 select-none pointer-events-none w-170 lg:w-172 h-[95vh]"/>
                    <div className="relative overflow-y-scroll flex flex-col items-center justify-start gap-12 p-8">
                        {activeLetter.letter}
                        <div className="flex flex-col items-stretch gap-2">
                            <button
                                onClick={() => {
                                    setShowLetter(false);
                                    setActiveLetter({date: ValidLetterDate.NONE, letter: ""});
                                }}
                                className="relative border border-neutral-600 px-6 py-2 font-bold text-2xl transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer">Close
                                Letter
                            </button>
                            {/*<button*/}
                            {/*    onClick={() => toggleGalleryLetter()}*/}
                            {/*    className="relative border border-neutral-600 px-6 py-2 font-bold text-2xl transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer">*/}
                            {/*    {galleryLetter ? "Hide" : "Show"} Yourself {galleryLetter &&*/}
                            {/*    <span className="font-nunito text-lg">&nbsp;&nbsp;*:(</span>}*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Letter;