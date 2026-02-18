"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

type _Props = {
    source: string;
    alt: string;
    caption: string;
    date: Date;
    position: {x: string; y: string, rotation: string};
}

const Polaroid = ({source, alt, caption, date, position: {x, y, rotation}} : _Props) => {
    const [localizedDate, setLocalizedDate] = useState('');

    useEffect(() => {
        setLocalizedDate(new Date(date).toLocaleString());
    }, [date]);

    return (
        <div className={`flex flex-col items-center justify-start shadow-lg bg-neutral-100 pt-2 px-2 pb-8 w-52 md:w-64 2xl:w-72 gap-6 absolute top-0 left-0 ${x} ${y} ${rotation} transition-all duration-200 ease-in-out hover:z-50 hover:scale-105 cursor-pointer`}>
            <div className="relative overflow-clip aspect-square w-50 md:w-62 2xl:w-68 h-50 md:h-62 2xl:h-68">
                <Image src={source} alt={alt} width={1000} height={1000} quality={100} className="absolute top-1/2 -translate-y-1/2 object-cover" />
            </div>
            <div className="flex flex-col items-center justify-start gap-2">
                <p className="font-barriecito text-sm lg:text-base text-neutral-800 px-2">{caption}</p>
                <p className="text-forest-green-500 font-bold font-barrio text-xs lg:text-sm">{localizedDate}</p>
            </div>
        </div>
    );
}

export default Polaroid;