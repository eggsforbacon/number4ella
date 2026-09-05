"use client";

import {useStore} from "@/store/store";
import Polaroid from "@/components/polaroid";
import {useEffect, useState} from "react";

const Gallery = () => {
    const {galleryLetter, activeLetter, toggleGalleryLetter} = useStore();

    const positions: { x: string, y: string, rotation: string }[] = [
        {x: "translate-x-4 lg:translate-x-16 xl:translate-x-8 2xl:translate-x-18", y: "translate-y-6", rotation: "-rotate-[8deg]"},
        {x: "translate-x-48 md:translate-x-64 lg:translate-x-64 xl:translate-x-56 2xl:translate-x-112", y: "translate-y-48 md:translate-y-9 2xl:translate-y-8", rotation: "rotate-[8deg]"},
        {x: "translate-x-4 md:translate-x-128 lg:translate-x-116 xl:translate-x-108 2xl:translate-x-216", y: "translate-y-90 md:translate-y-12 lg:translate-y-4 2xl:translate-y-10", rotation: "-rotate-[12deg] md:rotate-[2deg] lg:-rotate-[12deg]"},
        {x: "translate-x-48 md:translate-x-12 lg:translate-x-164 xl:translate-x-152 2xl:translate-x-118", y: "translate-y-132 md:translate-y-72 lg:translate-y-10 2xl:translate-y-116", rotation: "rotate-[4deg]"},
        {x: "translate-x-4 md:translate-x-68 lg:translate-x-14 xl:translate-x-6 2xl:translate-x-220", y: "translate-y-174 md:translate-y-72 2xl:translate-y-118", rotation: "-rotate-[6deg] lg:rotate-[12deg]"},
        {x: "translate-x-48 md:translate-x-128 lg:translate-x-56 xl:translate-x-50 2xl:translate-x-18", y: "translate-y-216 md:translate-y-76 lg:translate-y-86 2xl:translate-y-110", rotation: "rotate-[8deg] lg:-rotate-[6deg]"},
        {x: "translate-x-4 md:translate-x-6 lg:translate-x-112 xl:translate-x-96 2xl:translate-x-52", y: "translate-y-258 md:translate-y-164 lg:translate-y-80 2xl:translate-y-70", rotation: "rotate-[2deg]"},
        {x: "translate-x-48 md:translate-x-71 lg:translate-x-160 xl:translate-x-150 2xl:translate-x-172", y: "translate-y-300 md:translate-y-166 lg:translate-y-88 2xl:translate-y-80", rotation: "-rotate-[6deg]"},
        {x: "translate-x-4 md:translate-x-128 lg:translate-x-18 xl:translate-x-8 2xl:translate-x-52", y: "translate-y-342 md:translate-y-162 lg:translate-y-124 2xl:translate-y-4", rotation: "-rotate-[8deg] md:-rotate-[2deg] lg:-rotate-[8deg] 2xl:rotate-[6deg]"},
        {x: "translate-x-48 md:translate-x-8 lg:translate-x-58 xl:translate-x-50 2xl:translate-x-172", y: "translate-y-384 md:translate-y-216 lg:translate-y-128 2xl:translate-y-7", rotation: "rotate-[4deg] 2xl:-rotate-[9deg]"},
        {x: "translate-x-4 md:translate-x-52 lg:translate-x-116 xl:translate-x-110 2xl:translate-x-62", y: "translate-y-426 md:translate-y-218 lg:translate-y-120 2xl:translate-y-144", rotation: "rotate-[4deg] xl:-rotate-[4deg] 2xl:rotate-[4deg]"},
        {x: "translate-x-48 md:translate-x-88 lg:translate-x-158 xl:translate-x-150 2xl:translate-x-180", y: "translate-y-470 md:translate-y-210 lg:translate-y-130 2xl:translate-y-148", rotation: "rotate-[2deg]"},
        {x: "translate-x-4 md:translate-x-130 lg:translate-x-88 2xl:translate-x-250", y: "translate-y-502 lg:translate-y-152 md:translate-y-212 2xl:translate-y-76", rotation: "rotate-[8deg] md:-rotate-[6deg] lg:rotate-[8deg]"},
    ];

    const metaData: { caption: string, date: Date, alt: string }[] = [
        {
            caption: "I am always enamored by the warmth with which you look at me in this picture. The day I became your partner.",
            date: new Date("2025-10-23T20:07:00.000"),
            alt: "Ella looking at me with her blue sweater and resting her chin on her right hand.",
        },
        {
            caption: "I love this picture because of how happy you look, even covering your smile. It's also very red.",
            date: new Date("2025-10-24T23:21:00.000"),
            alt: "Ella looking down at me with her red cardigan covering her smile with her hand.",
        },
        {
            caption: "Silly kiss! Silly face! I love your kisses! Kisses kisses kisses!!!",
            date: new Date("2025-10-24T21:07:00.000"),
            alt: "Ella scrunching her face gesturing a kiss to me.",
        },
        {
            caption: "I could catch a hint of sadness in your eyes. It's the low halloween light, but you still look beautiful.",
            date: new Date("2025-11-03T05:52:00.000"),
            alt: "Ella in the mirror with her blue sweater surrounded by orange light.",
        },
        {
            caption: "You look happy here. It's moments before that smile I so adore. The pacific and the sunset framing your beauty.",
            date: new Date("2025-11-03T00:32:00.000"),
            alt: "Ella at the beach, clutching her arms and lifting her right leg.",
        },
        {
            caption: "The night we had however many freudian slips and couldn't manage to talk properly. You look so focused.",
            date: new Date("2025-10-19T08:26:00.000"),
            alt: "Ella under a lighting rig I think. She said it was super heavy. Her green cardigan.",
        },
        {
            caption: "The 0.5 angle pic!!! Now THIS one, THIS is the one that got me, Bug.",
            date: new Date("2025-11-03T00:24:00.000"),
            alt: "Ella with a 0.5 angle on her little hole at the beach.",
        },
        {
            caption: "To have caught this in my feed from your dad's profile made me feel you so close. And you and Kronk look adorable.",
            date: new Date("2025-11-07T13:01:00.000"),
            alt: "Ella cuddling Kronk against her face with her eyes closed.",
        },
        {
            caption: "I think this is the first selfie you sent me to keep. It felt so special. I'm happy to report you look gorgeous.",
            date: new Date("2025-10-17T12:38:00.000"),
            alt: "Ella looking at me with her signature chin on right hand pose, in low light.",
        },
        {
            caption: "Silly billy central!!! I love your silly faces",
            date: new Date("2025-10-30T05:41:00.000"),
            alt: "Ella being a silly billy and frowning a kiss rightwards.",
        },
        {
            caption: "Just a selfie you sent me to send it to me. And all I saw was you being gorgeous as always.",
            date: new Date("2025-11-05T05:03:00.000"),
            alt: "Ella looking at me with a gray tee and resting her chin on her right hand.",
        },
        {
            caption: "I love your laughter. You look ecstatic in this picture. Your smile is where my eyes land first for this picture.",
            date: new Date("2025-10-23T08:44:00.000"),
            alt: "Ella looking at me with her blue sweater and resting her chin on her right hand.",
        },
        {
            caption: "How do you manage to look this gorgeous just waking up. I don't get it. Thanks for the kiss, Love.",
            date: new Date("2025-11-07T15:54:00.000"),
            alt: "Ella just waking up and looking beautiful in a gray tee. Kissing me.",
        },
    ];

    const [shuffledIndexes, setShuffledIndexes] = useState<number[]>([]);

    useEffect(() => {
        const arr = Array.from({ length: metaData.length }, (_, i) => i);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setShuffledIndexes(arr);
    }, [metaData.length]);

    return (
        <div
            className={`z-50 absolute top-0 lg:right-0 h-full w-full lg:w-2/3 transition-all duration-300 delay-100 ${activeLetter && galleryLetter ? "opacity-100" : "select-none pointer-events-none opacity-0"} overflow-y-scroll overflow-x-visible!`}>
            {shuffledIndexes.map((randomIndex, index) => {
                const {caption, date, alt} = metaData[randomIndex];
                return (
                    <Polaroid
                        key={randomIndex}
                        source={`/images/gallery/${randomIndex}.jpg`} alt={alt}
                        position={positions[index]}
                        caption={caption}
                        date={date}
                    />
                )
            })}
            <button
                onClick={() => toggleGalleryLetter()}
                className="lg:hidden fixed left-1/2 -translate-x-1/2 bottom-6 border border-neutral-600 bg-amber-100 font-fleur-de-leah px-6 py-2 font-bold text-xl transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer">
                {galleryLetter ? "Hide" : "Show"} Yourself {galleryLetter &&
                <span className="font-nunito text-lg">&nbsp;&nbsp;*:(</span>}
            </button>
        </div>
    );
}

export default Gallery;