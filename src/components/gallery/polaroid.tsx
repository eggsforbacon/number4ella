"use client";

import useMedia from "@/store/media";
import Image from "next/image";
import { useMemo } from "react";

type _Props = {
  source: string;
  caption: string;
  height: number;
  width: number;
  date: Date;
  vertical: boolean;
  eager?: boolean;
};

const Polaroid = ({
  source,
  caption,
  height,
  width,
  date,
  vertical,
  eager = false,
}: _Props) => {
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
      className={`flex flex-col items-center justify-start shadow-lg bg-neutral-100 p-2 gap-6 top-0 left-0 transition-all duration-200 ease-in-out hover:scale-[1.01] cursor-pointer`}
    >
      <div
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
        className={`h-50 lg:h-128 relative overflow-clip ${dimensions}`}
      >
        <Image
          src={source}
          alt={caption}
          width={width}
          height={height}
          quality={100}
          loading={eager ? "eager" : "lazy"}
          className={`absolute top-1/2 -translate-y-1/2 object-cover ${vertical ? "h-full" : "w-full"}`}
        />
      </div>
    </div>
  );
};

export default Polaroid;
