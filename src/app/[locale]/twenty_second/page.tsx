"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  PauseFill,
  PlayFill,
  VolumeMuteFill,
  VolumeUpFill,
  Fullscreen,
  FullscreenExit,
} from "react-bootstrap-icons";

interface ScreenOrientation {
  lock?: (
    orientation:
      | "landscape"
      | "portrait"
      | "landscape-primary"
      | "landscape-secondary"
      | "portrait-primary"
      | "portrait-secondary"
      | "any"
      | "natural",
  ) => Promise<void>;
  unlock?: () => void;
}

export default function TwentySecond() {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const rangeInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [seekbarValue, setSeekbarValue] = useState<number>(0);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFull = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFull);

      if (!isCurrentlyFull && window.screen?.orientation) {
        window.screen.orientation.unlock();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleMute = () => {
    setMuted(!muted);
  };

  const togglePlay = () => {
    const reel = videoRef.current!;
    if (playing) reel.pause();
    else reel.play();
    setPlaying(!playing);
  };

  const toggleFullscreen = async () => {
    const container = mainContainerRef.current;
    if (!container) return;

    type LockableOrientation = ScreenOrientation & {
      lock?: (
        orientation: "landscape" | "portrait" | "landscape-primary",
      ) => Promise<void>;
    };

    const orientation = window.screen?.orientation as
      LockableOrientation | undefined;

    try {
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        }
        if (orientation && typeof orientation.lock === "function") {
          await orientation.lock("landscape");
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        window.screen?.orientation?.unlock();
      }
    } catch (error) {
      console.error("Fullscreen toggle failed:", error);
    }
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
    <main
      ref={mainContainerRef}
      className={`flex flex-col gap-4 items-center justify-center px-6 md:px-16 lg:px-32 min-h-screen w-full transition-all duration-400 ease-in-out ${playing ? "bg-black" : "bg-forest-green-800"}`}
    >
      <video
        className={`rounded-lg shadow border transition-all duration-200 ease-in-out ${playing ? "border-white/30 shadow-[#c52429]/40 shadow-2xl" : "border-forest-green-400"}`}
        ref={videoRef}
        autoPlay={false}
        onClick={togglePlay}
        muted={muted}
        onProgress={handleProgress}
      >
        <source src="/videos/Ella22.webm" />
      </video>
      <div
        className={`rounded-full bg-neutral-500/30 backdrop-blur-2xl text-white flex justify-between w-full items-center gap-8 px-4 py-2 transition-all duration-200 ease-in-out ${playing ? "opacity-30 hover:opacity-100" : "opacity-100"}`}
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
              className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}
            />
          ) : (
            <PlayFill
              size={24}
              className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}
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
              className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}
            />
          ) : (
            <VolumeUpFill
              size={24}
              className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}
            />
          )}
        </button>
        <button
          className={
            "rounded-full p-2 flex items-center justify-center border border-off-white"
          }
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <FullscreenExit
              size={24}
              className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}
            />
          ) : (
            <Fullscreen
              size={24}
              className={"aspect-square h-3 w-3 xl:h-auto xl:w-auto"}
            />
          )}
        </button>
      </div>
    </main>
  );
}
