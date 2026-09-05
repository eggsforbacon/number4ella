"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

type _Props = {
    source: string;
    caption: string;
    date: Date;
    position: { lane: 1 | 2 | 3 | 4, rotation: string, vertical?: boolean }
}

const FilmStrip = ({source, caption, date, position: {lane, rotation, vertical = true}}: _Props) => {
    const [localizedDate, setLocalizedDate] = useState('');

    // useEffect(() => {
    //     setLocalizedDate(new Date(date).toLocaleString());
    // }, [date]);

    return (
        <div
            className={`relative flex flex-col items-center justify-start shadow-lg bg-black py-2 px-4 gap-2 transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer`}>
            <div className={`flex ${vertical ? "flex-row" : "flex-col"}`}>
                <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-between gap-2`}>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                </div>
                <div className={`relative overflow-clip ${vertical ? "h-52 md:h-64 2xl:h-138 aspect-9/16" : "w-52 md:w-64 2xl:w-138 aspect-video"}`}>
                    <video playsInline muted autoPlay width="300" className="absolute object-cover">
                        <source src={source} type="video/webm"/>
                    </video>
                </div>
                <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-between gap-2`}>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                    <span className="aspect-square w-10 bg-white"/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-2">
                <p className="font-barriecito text-sm lg:text-base text-neutral-200 px-2">{caption}</p>
                <p className="text-amber-200 font-bold font-barrio text-xs lg:text-sm">{localizedDate}</p>
            </div>
        </div>
    );
}

export default FilmStrip;