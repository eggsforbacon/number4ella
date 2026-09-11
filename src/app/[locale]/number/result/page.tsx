"use client";

import React, {useEffect, useRef, useState} from "react";
import {useStore} from "@/store/store";
import {getRandomInt} from "@/utils";
import {FaPlay} from "react-icons/fa";
import {FaArrowRotateLeft} from "react-icons/fa6";
import NumberPicker from "@/components/number-picker";
import {useTranslations} from "next-intl";

export default function Result() {
    const [ended, setEnded] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const {upperBound, setUpperBound, lowerBound, setLowerBound, result, setResult} = useStore();

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const MAX = 26;

    const poems : string[] =  [
        "The frogs in the city in the heart of the valley,\nthey sing a lullaby to sleep to.\nOh, lover, stay so we can sleep in,\nyou're the one I heed to.",
        "Sleeping, but present, going with me everywhere.\nLatch, be, let me feel your presence linger.\nYour content answers my prayer.",
        "Cold south at the feet of the mountain,\ntrees and fog adorn her loin.\nTo hold your trembling hands in this weather,\nI long for our rejoin.",
        "Uphill from here, uphill to work,\nthe sun scorching and the days long.\nTo be close to you I must go far,\nbut Love, my love for you has the patience of a cigar.",
        "On a home, cooking, but cooking without the one I love the most.\nBut to cook with and for you I must be awful at it first,\nMay my best meals be the ones to find you first.",
        "To explain you, and why 1 + 1 is 3 to anyone, will for sure be a miss.\nBut the confusion on their faces, may turn to admiration,\nand so our love sets us ablaze.",
        "Repetition, repetition, repetition. For you, my patience sees no end.\nUntil my throat goes sore and my brain forgets my name:\nI love you, please never stop wanting to be my girl.",
        "Taught me joy and taught me yearning,\nto occupy space, to be myself.\nIncorporate a happy dance in me,\nnow everytime I feel myself.",
        "The last thought of the night,\nyou get it everytime.\nEven in tired eyes,\nmy heart remembers to look at you and shine.",
        "Domesticity, and sharing my first spaces all with you.\nSomething simple, undecorous, unequivocally mundane.\nThe boring and routinely, with you, my favourite day.",
        "My people, my past, my family, my future, my name.\nMuch more my present and my thoughts:\nI want to share them with you, brightest flame.",
        "The first thought of the morning,\nyou get it everytime.\nEven while defrosting,\nmy eyes remember to look for your tired smile.",
        "Lectures, exercises, problems. All I see these days: math and numbers.\nI don't think I need or want to solve you, however.\nFor you're beautiful to just experience, whenever.",
        "A train to nowhere, a train home.\nThe whole trip my eyes through windows wander.\nOh, your honey eyes, your tender hands,\nhow lighter they would make the trip,\nI wonder.",
        "Tell you when I want to tell you,\nand I always want to do so.\nBut I also want to always want to,\nthe love I feel, for granted? Boo. Tomato, tomato.",
        "I want to show you everywhere,\nand follow you everywhere you've been to too.\nTell me all the stories, let me in on details.\nYour brain is fill with whimsy,\nI want to see the world like you do.",
        "Make me notice my habits, my motions, my catchphrases, my normalities.\nMake me uncomfortably confortable, appallingly welcome to exist as me.",
        "Que llegaras sin saberlo, recordarlo o incluso quererlo,\ny que aún así lo intentes, y digas aún no merecerlo,\nme llena de orgullo el alma, y más tu condición,\nde amarte con todo y trapitos,\nen inglés, alemán y español.",
        "The words I tell you are but a millionth of the words I don't.\nAnd so, even when they don't or can't rhyme,\nI will always have Love ready for you, my Bug.",
        "I may be forgetful, I regret being so scattered.\nMatch your effort with my patience, be my brakes and I'll be your gas,\nMay the last thing I forget be\nthe shape of your name between my gasps.",
        "The one you turned after I met you,\nthe first of many in what I want to last,\nlong, long, auch für Ewigkeit,\nbis ich nicht mehr atmen kann, bis du meine Neugier nie befriedigst.",
        "I want to take long, unending walks with you,\nsee paths you never saw, make a path that never was.\nPick wildflowers on the way,\nsit on the ground, and watch over the land.",
        "My music is what moves me, since before I learned to speak.\nYou're beauty, you're fire, you are muse,\nI don't want any other topics,\nof your existence they shall sing.",
        "Hearty meal, hearty soup, friends, time together, laughs.\nYour own world colliding with mine,\nlike stars, together, a third, fuller system from it sprawls.",
        "The end of all things, the beginning of a walk,\na journey, like you once it called.\nWhat the end goal or the fall is, couldn't worry me much less,\nfor not the ending, but the journey is the reward.",
    ];

    const handlePlay = () => {
        const video = videoRef.current as HTMLVideoElement;
        setEnded(false);
        setPlaying(true);
        video.play();
    }

    const pause = () => {
        const video = videoRef.current as HTMLVideoElement;
        setPlaying(false);
        video.pause();
    }

    useEffect(() => {
        if (window !== undefined) {
            const storedBounds = sessionStorage.getItem("bounds");
            if (storedBounds !== null) {
                const {upper, lower}: { upper: number, lower: number } = JSON.parse(storedBounds);
                setUpperBound(upper);
                setLowerBound(lower);
            } else if (upperBound !== "" && lowerBound !== "") {
                sessionStorage.setItem("bounds", JSON.stringify({
                    upper: upperBound as number,
                    lower: lowerBound as number
                }));
            }
            const res = getRandomInt(upperBound as number, lowerBound as number);
            setResult(res > MAX ? MAX : res);
        }
    }, [lowerBound, setLowerBound, setResult, setUpperBound, upperBound]);

    const t = useTranslations("Result");

    return (
        <main
            className="flex-col lg:flex-row gap-6 pt-[10vh] px-6 lg:pt-0 pb-6 text-center items-center font-barriecito text-amber-100 justify-start lg:justify-center w-full min-h-screen">
            <div className="flex flex-col items-center justify-center gap-6">
                <h2 className="text-3xl font-bold">{t("title")}</h2>
                <div
                    className="relative w-full max-w-96 h-148 overflow-clip rounded-xl shadow-lg shadow-forest-green-500/60">
                    <video key={result} ref={videoRef} className="relative" playsInline muted={false} onEnded={() => {
                        setPlaying(false);
                        setEnded(true);
                    }}
                           width={1920} height={1080}>
                        <source src={`/videos/${result}_comp.webm`} type="video/webm"/>
                        Your browser does not support the video tag
                    </video>
                    {playing && (<span className="w-full h-full absolute top-0 left-0" onClick={() => {
                        pause();
                    }}/>)}
                    <div onClick={() => handlePlay()}
                         className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 aspect-square w-16 rounded-full overflow-clip bg-white/30 backdrop-blur-2xl flex items-center justify-center transition-all duration-700 ease-in-out ${playing ? "opacity-0 pointer-events-none select-none" : "opacity-100"}`}>
                        {ended ? <FaArrowRotateLeft size={24}/> : <FaPlay size={24}/>}
                    </div>
                </div>
                <h1 className="font-bold text-5xl">{result}</h1>
                <p className="font-explora text-3xl max-w-172">{poems[(result ?? 1) - 1]}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 w-md">
                <NumberPicker repeat />
            </div>
        </main>
    );
}