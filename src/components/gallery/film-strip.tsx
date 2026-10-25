"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import useMedia from "@/store/media";

type _Props = {
  source: string;
  caption: string;
  date: Date;
  vertical?: boolean;
  height: number;
  width: number;
};

const FilmStrip = ({
  source,
  caption,
  date,
  vertical = true,
  height,
  width,
}: _Props) => {
  const t = useTranslations("Gallery");
  const { setActive, toggleIsActive } = useMedia();

  const dimensions = useMemo(() => {
    const THREE_QUARTERS = 0.75;
    const NINE_SIXTEENTHS = 9 / 16;
    if (vertical) {
      return width / height === THREE_QUARTERS
        ? "aspect-3/4"
        : width / height === NINE_SIXTEENTHS
          ? "aspect-9/16"
          : "" + "h-full";
    } else
      return height / width === THREE_QUARTERS
        ? "aspect-4/3"
        : height / width === NINE_SIXTEENTHS
          ? "aspect-16/9"
          : "" + "w-full";
  }, [height, vertical, width]);

  return (
    <div
      className={`relative flex flex-col items-center justify-start shadow-lg bg-black p-2 gap-2 transition-all duration-200 ease-in-out hover:scale-[1.01] cursor-pointer`}
    >
      <div
        className={`flex h-full ${vertical ? "flex-row" : "flex-col"} gap-2`}
      >
        <div
          className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-between gap-2`}
        >
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
        </div>
        <div
          className={`${vertical ? "h-50 lg:h-128" : "h-36 lg:h-92"} relative overflow-clip group ${dimensions}`}
        >
          <video
            autoPlay={false}
            muted
            width={width}
            onClick={() => {
              toggleIsActive();
              setActive({
                source,
                caption,
                vertical,
                type: "video",
                width,
                height,
                alt: caption,
                date,
              });
            }}
            className={`absolute h-full`}
          >
            <source src={source} type="video/webm" />
          </video>
        </div>
        <div
          className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-between gap-2`}
        >
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
          <span
            className={`aspect-square ${vertical ? "w-2 lg:w-8 h-full" : "w-full"} bg-white`}
          />
        </div>
      </div>
    </div>
  );
};

export default FilmStrip;
