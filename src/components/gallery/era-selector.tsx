"use client";

import { Milestone, useGallery } from "@/store/gallery";
import Caret from "../svg/caret";
import { useRouter } from "@/i18n/navigation";

const EraSelector = () => {
  const {
    shownGallery: shown,
    setShownGallery: setShown,
    dropdownShown,
    toggleDropdown,
  } = useGallery();

  const router = useRouter();

  const gallery: { [key in Milestone]: string } = {
    DIST1: "September - December 2025",
    USA1: "December 2025 - January 2026",
    DIST2: "January - March 2026",
    COL1: "March - April 2026",
    DIST3: "April - May 2026",
    GER1: "May - June 2026",
    DIST4: "June - July 2026",
    USA2: "July - September 2026",
    DIST5: "September - December 2026",
    COL2: "December 2026 - January 2027",
  };

  const handleClick = (k: Milestone) => {
    setShown(k);
    toggleDropdown();
  };

  return (
    <div className={`w-full px-6 py-2 relative z-10 flex flex-col lg:flex-row-reverse gap-2`}>
      <div
        className={`absolute bottom-0 lg:bottom-auto lg:-top-96 right-0 rounded-2xl backdrop-blur-xl shadow-2xl bg-neutral-800/30 lg:bg-forest-green-800 h-96 w-full max-w-96 overflow-y-scroll transition-all duration-600 ease-in-out ${dropdownShown ? "-translate-y-38 lg:translate-y-116 opacity-100 pointer-events-auto" : "translate-y-0 opacity-0 pointer-events-none"}`}
      >
        <ul className="relative px-1 py-2 flex flex-col w-full gap-2">
          {Object.keys(gallery).map((k, i) => {
            return (
              <li
                key={i}
                className={`text-sm w-full cursor-pointer transition-all duration-200 ease-in-out ${(k as Milestone) === shown ? "bg-forest-green-500 rounded-2xl text-white hover:bg-forest-green-300/50" : "text-neutral-400 hover:bg-neutral-300/20"} hover:rounded-xl`}
              >
                <button
                  onClick={() => handleClick(k as Milestone)}
                  className="text-start w-full h-full p-4 truncate"
                >
                  {gallery[k as Milestone]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={toggleDropdown}
        className="relative w-full max-w-96 backdrop-blur-2xl bg-neutral-300/10 px-6 py-4 rounded-2xl flex items-center justify-between gap-4"
      >
        <span className="text-sm truncate w-full">{gallery[shown]}</span>
        <Caret
          className="stroke-neutral-300"
          orientation={dropdownShown ? "up" : "down"}
        />
      </button>
      <button onClick={() => router.push("/")} className="w-full max-w-96 text-nowrap text-center relative backdrop-blur-xl bg-neutral-500/30 px-6 py-4 rounded-2xl tex-white">
        Go back home
      </button>
    </div>
  );
};

export default EraSelector;
