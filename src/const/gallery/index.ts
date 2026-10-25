import { Milestone } from "@/store/gallery";
import USA1 from "./USA1";

export type GalleryMedia = {
  type: "video" | "image";
  source: string;
  caption: string;
  vertical: boolean;
  width: number,
  height: number,
};

const DIST1: GalleryMedia[] = [];

const DIST2: GalleryMedia[] = [];

const COL1: GalleryMedia[] = [];

const DIST3: GalleryMedia[] = [];

const GER1: GalleryMedia[] = [];

const DIST4: GalleryMedia[] = [];

const USA2: GalleryMedia[] = [];

const DIST5: GalleryMedia[] = [];


export const GALLERY_DICT: { [key in Milestone]: GalleryMedia[] } = {
  DIST1,
  USA1,
  DIST2,
  COL1,
  DIST3,
  GER1,
  DIST4,
  USA2,
  DIST5,
  COL2: []
};
