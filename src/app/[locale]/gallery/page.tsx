"use client";

import { useTranslations } from "next-intl";
import EraSelector from "@/components/gallery/era-selector";
import useRenderGallery from "@/hooks/useRenderGallery";
import { MediaProps, Milestone } from "@/store/gallery";
import FilmStrip from "@/components/gallery/film-strip";
import Polaroid from "@/components/gallery/polaroid";
import MediaModal from "@/components/gallery/media-modal";

export default function Gallery() {
  const {
    shown,
    loadedGallery,
    currentlyRendered,
    setCurrentlyRendered,
    MODULO,
    LENGTH,
  } = useRenderGallery();

  const t: { [key in Milestone]: string } = {
    DIST1: "",
    USA1: "Gallery.December",
    DIST2: "",
    COL1: "",
    DIST3: "",
    GER1: "",
    DIST4: "",
    USA2: "",
    DIST5: "",
    COL2: "",
  };

  const activeDict = useTranslations(t[shown]);

  return (
    <main className="relative bg-forest-green-600 w-screen h-screen text-white font-autour-one flex flex-col items-stretch justify-start gap-6">
      <section className="relative overflow-y-scroll pt-38 w-full h-full">
        {LENGTH !== 0 ? currentlyRendered.map((i) => {
          const batch: MediaProps[] = loadedGallery[i];
          return (
            <ul key={i} className="flex flex-wrap px-2">
              {batch.map((media, j) => {
                switch (media.type) {
                  case "video":
                    return (
                      <FilmStrip key={j}
                        {...media}
                      />
                    );
                  case "image":
                    return (
                      <Polaroid key={j}
                        {...media}
                      />
                    );
                }
              })}
            </ul>
          );
        }) : (
            <div className="w-full h-full flex items-center justify-center text-center">This gallery is still being filled *:)</div>
        )}
        <div className={` ${LENGTH === 0 ? "hidden" : "relative lg:fixed"} lg:bottom-16 lg:right-16 w-full lg:w-auto pb-64 py-24 px-6 lg:p-0 flex flex-col items-center justify-center`}>
          <button
              onClick={() => {
              if (currentlyRendered.length < MODULO)
                    setCurrentlyRendered((prevState) => [
                      ...prevState,
                      prevState.findLast(_ => true)! + 1
                    ]);;
              }}
              className="relative backdrop-blur-xl bg-neutral-800/30 px-6 py-4 rounded-2xl flex items-center tex-white disabled:cursor-not-allowed disabled:text-neutral-300 disabled:bg-neutral-800/30" disabled={currentlyRendered.findLast(_ => true)! >= MODULO - 1}>Load
              next
          </button>
        </div>
      </section>
      <div className="absolute top-0 left-0 w-full text-center lg:text-start flex flex-col lg:flex-row items-center justify-between gap-6 px-3 lg:px-32 2xl:px-40 py-20 pb-6 lg:py-8 bg-neutral-950/20 backdrop-blur-2xl">
        <h1 className="text-3xl lg:text-6xl">Gallery</h1>
        <div className="hidden lg:inline-flex">
          <EraSelector />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full text-center flex lg:hidden items-center justify-between gap-6 px-3 lg:px-32 2xl:px-40 py-8">
        <EraSelector />
      </div>
      <MediaModal />
    </main>
  );
}
