"use client";

import FilmStrip from "@/components/film-strip";
import {useTranslations} from "next-intl";
import {DEC_25, GalleryMedia} from "@/const/gallery";
import Polaroid from "@/components/polaroid";
import React, {ReactElement, useEffect, useState} from "react";
import {Link} from "@/i18n/navigation";

export default function Gallery() {

    const december = useTranslations("Gallery.December");

    const LIMIT = Math.min(parseInt(process.env.NEXT_PUBLIC_BATCH_SIZE ?? "0"), DEC_25.length);
    const MODULO = Math.ceil(DEC_25.length / LIMIT);

    const [renderedArray, setRenderedArray] = useState<ReactElement[][]>([]);
    const [currentlyRendered, setCurrentlyRendered] = useState<number>(0);

    useEffect(() => {
        if (window !== undefined) {
            const generateGalleryArray = () => {

                const getDate = (fileName: string) => {
                    const dateTime = fileName.split("_");
                    const {date, time} = {
                        date: dateTime[0].match(/.{1,2}/g) ?? "",
                        time: dateTime[1] !== "" ? dateTime[1].match(/.{1,2}/g) ?? "" : ""
                    };
                    const dateTimeStringNew = `${date[0]}${date[1]}-${date[2]}-${date[3]}T${time[0]}:${time[1]}:${time[2]}.000-8:00`;
                    return new Date(Date.parse(dateTimeStringNew));
                };

                const generateLane: () => 1 | 2 | 3 = () => {
                    return (Math.floor(Math.random() * 2) + 1) as 1 | 2 | 3;
                }

                const galleryArray = [];
                for (let j = 0; j < MODULO -1; j++) {
                    const sectionArray = [];
                    for (let i = 0; i < LIMIT; i++) {
                        const media: GalleryMedia = DEC_25[i + (LIMIT * j)];
                        switch (media.type) {
                            case "image":
                                sectionArray.push(
                                    <Polaroid source={media.source}
                                              alt={media.caption}
                                              caption={media.caption}
                                              date={getDate(media.source.replaceAll("/images/gallery/USA-DEC/", "").replaceAll(".webp", ""))}
                                              position={generateLane()}
                                              vertical={media.vertical}/>
                                );
                                continue;
                            case "video":
                                sectionArray.push(
                                    <FilmStrip source={media.source}
                                               caption={media.caption}
                                               date={getDate(media.source.replaceAll("/videos/gallery/USA-DEC/", "").replaceAll(".webm", ""))}
                                               vertical={media.vertical}/>
                                );
                        }
                    }
                    galleryArray.push(sectionArray);
                }
                return galleryArray;
            }

            const a = generateGalleryArray();
            setRenderedArray(a);
        }
    }, [LIMIT]);

    return (
        <main
            className="bg-forest-green-600 w-screen h-screen text-white font-barriecito flex flex-col items-stretch justify-start gap-6">
            <div className="text-center lg:text-start flex flex-col lg:flex-row items-center justify-between gap-6 px-3 lg:px-32 2xl:px-40 py-20 pb-6 lg:py-8 bg-neutral-950">
                <div className="flex flex-col gap-4 overflow-clip">
                    <h1 className="font-black text-3xl px-6">{december("title")}</h1>
                    <p className="relative left-6 lg:max-w-96 -mx-6 lg:mx-auto text-wrap text-2xl lg:text-3xl font-explora">{december("description.line1")}<br/>{december("description.line2")}</p>
                </div>
                <div className="flex gap-4">
                    <Link href={"/"}
                          className="text-neutral-300 rounded border border-neutral-600 px-6 py-2 transition-all duration-200 ease-in-out hover:bg-white hover:text-black cursor-pointer">Go
                        back</Link>
                    <button
                        onClick={() => {
                            if (currentlyRendered < MODULO)
                                setCurrentlyRendered((prevState) => prevState + 1);
                        }}
                        className="rounded bg-amber-100 text-forest-green-900 px-6 py-1.5 font-barriecito cursor-pointer">Load
                        next
                    </button>
                </div>
            </div>
            <section className="relative flex flex-col lg:flex-row items-center justify-start gap-16 w-full overflow-x-scroll h-full">
                <span className="px-3 lg:px-10 2xl:px-14 bg-forest-green-600 select-none text-forest-green-600">a</span>
                {renderedArray.map((sect, i) => {
                    return (<React.Fragment key={i}>{
                        currentlyRendered >= i && sect.map((item, j) => {
                            return <React.Fragment key={j}>{item}</React.Fragment>
                        })
                    }</React.Fragment>)
                })}
                <span className="px-3 lg:px-10 2xl:px-14 bg-forest-green-600 select-none text-forest-green-600">a</span>
            </section>
        </main>
    );
}