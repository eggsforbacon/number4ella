"use client";

import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {PauseFill, PlayFill, VolumeMuteFill, VolumeUpFill} from "react-bootstrap-icons";
import {useTranslations} from "next-intl";

type _Props = {
    source: string;
    caption: string;
    date: Date;
    vertical?: boolean;
}

const FilmStrip = ({source, caption, date, vertical = true}: _Props) => {

    const t = useTranslations("Gallery");

    const [localizedDate, setLocalizedDate] = useState('');
    const rangeInputRef = useRef<HTMLInputElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [seekbarValue, setSeekbarValue] = useState(0);

    const re = RegExp("^(((sm:)|(md:)|(lg:)|([2-3]xl:))?-?rotate-([0-9]+|\\[-?[0-9\\.]+(deg|rad)?\\]) *)+$");

    useEffect(() => {
        date.toLocaleDateString()
        setLocalizedDate(date.toLocaleDateString());
    }, [date]);

    const toggleMute = () => {
        setMuted(!muted);
    };

    const togglePlay = () => {
        const reel = videoRef.current!;
        if (playing) reel.pause();
        else reel.play();
        setPlaying(!playing);
    };

    const handleProgress = (e: SyntheticEvent<HTMLVideoElement>) => {
        const currentTime = e.currentTarget.currentTime;
        const maxSeconds = e.currentTarget.duration;

        setSeekbarValue(currentTime / maxSeconds * 100);
    };

    const handleSeekbarChange = () => {
        if (rangeInputRef.current) {
            const newValue = parseInt(rangeInputRef.current.value);
            setSeekbarValue(newValue);
            if (videoRef.current) {
                const duration = videoRef.current.duration;
                videoRef.current.currentTime = newValue / 100 * duration;
            }
        }
    };

    return (
        <div
            className={`relative flex flex-col items-center justify-start shadow-lg bg-black py-2 px-2 gap-2 transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer`}>
            <div className={`flex ${vertical ? "flex-row" : "flex-col"} gap-2`}>
                <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-between gap-2`}>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                </div>
                <div
                    className={`relative overflow-clip group ${vertical ? "h-88 md:h-64 2xl:h-88 aspect-9/16 w-full" : "w-52 md:w-64 2xl:w-138 aspect-video"}`}>
                    <video ref={videoRef} playsInline muted={muted} width="300"
                           onProgress={handleProgress} onClick={togglePlay}
                           className={"absolute object-cover w-full"}>
                        <source src={source} type="video/webm"/>
                    </video>
                </div>
                <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-between gap-2`}>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                    <span className="aspect-square w-8 bg-white"/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-2">
                <div
                    className={`transition-all duration-600 ease-in-out hover:opacity-100 ${playing ? "opacity-0" : "opacity-100"} transition-all duration-200 ease-in-out w-full flex items-center justify-between gap-6 bg-linear-to-t from-black/80 via-black/60`}>
                    <button className={"rounded-full p-2 flex items-center justify-center border border-off-white"}
                            onClick={togglePlay}>
                        {
                            playing ?
                                <PauseFill size={24} className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}/> :
                                <PlayFill size={24} className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}/>
                        }
                    </button>
                    <input type={"range"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"}
                           min={0} max={100} value={seekbarValue.toString()}
                           ref={rangeInputRef}
                           onChange={handleSeekbarChange}/>
                    <button className={"rounded-full p-2 flex items-center justify-center border border-off-white"}
                            onClick={toggleMute}>
                        {
                            muted ?
                                <VolumeMuteFill size={24} className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}/> :
                                <VolumeUpFill size={24} className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}/>
                        }
                    </button>
                </div>
                <p className="font-barriecito text-sm lg:text-xl text-neutral-200 px-2">{caption}</p>
                <p className="text-amber-200 font-bold font-nunito text-xs lg:text-sm">{localizedDate}</p>
            </div>
        </div>
    );
}

export default FilmStrip;