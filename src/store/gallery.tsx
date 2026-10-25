import { GalleryMedia } from "@/const/gallery";
import { create } from "zustand";

export type Milestone =
  | "DIST1"
  | "USA1"
  | "DIST2"
  | "COL1"
  | "DIST3"
  | "GER1"
  | "DIST4"
  | "USA2"
  | "DIST5"
  | "COL2";

export type MediaProps = GalleryMedia & {
  alt: string;
  date: Date;
};

interface Gallery {
  shownGallery: Milestone;
  setShownGallery: (m: Milestone) => void;
  focusedImage: string;
  setFocusedImage: (f: string) => void;
  dropdownShown: boolean;
  toggleDropdown: () => void;
}

export const useGallery = create<Gallery>((set, get) => ({
  shownGallery: "USA1",
  setShownGallery: (m: Milestone) => set(() => ({ shownGallery: m })),
  focusedImage: "",
  setFocusedImage: (f: string) => set(() => ({ focusedImage: f })),
  dropdownShown: false,
  toggleDropdown: () => set(() => ({ dropdownShown: !get().dropdownShown })),
}));
