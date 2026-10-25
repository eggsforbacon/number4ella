"use client";

import useMedia from "@/store/media";
import { SyntheticEvent, useMemo, useRef, useState } from "react";
import {
  PauseFill,
  PlayFill,
  VolumeMuteFill,
  VolumeUpFill,
} from "react-bootstrap-icons";
import Image from "next/image";

const MediaModal = () => {
  const { active, resetActive, isActive } = useMedia();

  const { type, source, caption, width, height, alt, date } = useMemo(
    () =>
      active !== null
        ? active
        : {
            type: "image",
            source: null,
            caption: "",
            vertical: false,
            width: 0,
            height: 0,
            alt: "",
            date: new Date(),
          },
    [active],
  );

  const localizedDate = useMemo(() => {
    return date.toLocaleDateString();
  }, [date]);

  const rangeInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(true);
  const [seekbarValue, setSeekbarValue] = useState<number>(0);

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

    setSeekbarValue((currentTime / maxSeconds) * 100);
  };

  const handleSeekbarChange = () => {
    if (rangeInputRef.current) {
      const newValue = parseInt(rangeInputRef.current.value);
      setSeekbarValue(newValue);
      if (videoRef.current) {
        const duration = videoRef.current.duration;
        videoRef.current.currentTime = (newValue / 100) * duration;
      }
    }
  };

  return (
    <div
      className={`z-50 flex flex-col lg:flex-row items-stretch lg:items-center justify-end fixed top-0 w-full h-full backdrop-blur-lg bg-black/40 overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <aside
        className={`flex flex-col items-stretch py-8 px-4 gap-4 overflow-y-scroll relative w-full lg:w-1/2 h-[85%] lg:h-[95%] z-50 bg-neutral-100/10 rounded-t-2xl lg:rounded-b-2xl border border-neutral-400/50 transition-all duration-300 ease-in-out ${isActive ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-x-full"}`}
      >
        <button
          onClick={() => resetActive()}
          className="absolute top-1 right-1 bg-neutral-800/40 backdrop-blur-md aspect-square font-bold text-white/70 rounded-full w-10 border border-neutral-500/40"
        >
          &#10005;
        </button>
        <div className="w-full rounded-xl bg-neutral-800/70 min-h-96">
          {source && (
            <>
              {type === "image" ? (
                <Image
                  src={source}
                  alt={alt}
                  width={width}
                  height={height}
                  quality={100}
                  loading={"lazy"}
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay={false}
                    muted={muted}
                    width={width}
                    onProgress={handleProgress}
                    onClick={togglePlay}
                  >
                    <source src={source} type="video/webm" />
                  </video>
                  <div className="flex flex-col items-center justify-start gap-2">
                    <div
                      className={`transition-all duration-600 ease-in-out hover:opacity-100 ${playing ? "opacity-0" : "opacity-100"} transition-all duration-200 ease-in-out w-full flex items-center justify-between gap-6 bg-linear-to-t from-black/80 via-black/60`}
                    >
                      <button
                        className={
                          "rounded-full p-2 flex items-center justify-center border border-off-white"
                        }
                        onClick={togglePlay}
                      >
                        {playing ? (
                          <PauseFill
                            size={24}
                            className={
                              "aspect-square h-3 w-3 xl:h-auto xl:w-auto"
                            }
                          />
                        ) : (
                          <PlayFill
                            size={24}
                            className={
                              "aspect-square h-3 w-3 xl:h-auto xl:w-auto"
                            }
                          />
                        )}
                      </button>
                      <input
                        type={"range"}
                        className={
                          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        }
                        min={0}
                        max={100}
                        value={seekbarValue.toString()}
                        ref={rangeInputRef}
                        onChange={handleSeekbarChange}
                      />
                      <button
                        className={
                          "rounded-full p-2 flex items-center justify-center border border-off-white"
                        }
                        onClick={toggleMute}
                      >
                        {muted ? (
                          <VolumeMuteFill
                            size={24}
                            className={
                              "aspect-square h-3 w-3 xl:h-auto xl:w-auto"
                            }
                          />
                        ) : (
                          <VolumeUpFill
                            size={24}
                            className={
                              "aspect-square h-3 w-3 xl:h-auto xl:w-auto"
                            }
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <h2 className="text-2xl">{caption}</h2>
        <p>{localizedDate}</p>
      </aside>
    </div>
  );
};

export default MediaModal;
