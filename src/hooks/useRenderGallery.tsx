import { GALLERY_DICT, GalleryMedia } from "@/const/gallery";
import { MediaProps, useGallery } from "@/store/gallery";
import { useMemo, useState } from "react";

const useRenderGallery = () => {
  const { shownGallery: shown, setShownGallery: setShown } = useGallery();
  const [currentlyRendered, setCurrentlyRendered] = useState<number[]>([0]);

  const LENGTH = GALLERY_DICT[shown].length;
  const LIMIT = Math.min(
    parseInt(process.env.NEXT_PUBLIC_BATCH_SIZE ?? "30"),
    LENGTH,
  );
  const MODULO = Math.ceil(LENGTH / LIMIT);

  const loadedGallery = useMemo<MediaProps[][]>(() => {
    const getDate = (fileName: string) => {
      const dateTime = fileName.split("_");
      const { date, time } = {
        date: dateTime[0].match(/.{1,2}/g) ?? "",
        time: dateTime[1] !== "" ? (dateTime[1].match(/.{1,2}/g) ?? "") : "",
      };
      const dateTimeStringNew = `${date[0]}${date[1]}-${date[2]}-${date[3]}T${time[0]}:${time[1]}:${time[2]}.000-08:00`;
      return new Date(dateTimeStringNew);
    };

    const galleryArray = [];
    for (let j = 0; j < MODULO; j++) {
      const sectionArray = [];
      for (let i = 0; i < LIMIT; i++) {
        const media: GalleryMedia | undefined =
          GALLERY_DICT[shown][i + LIMIT * j];
        if (media === undefined) break;
        const isImage = media.type === "image";

        sectionArray.push({
          ...media,
          alt: media.caption,
          date: getDate(
            media.source
              .replaceAll(`/${isImage ? "images" : "videos"}/gallery/USA1/`, "")
              .replaceAll(isImage ? ".webp" : ".webm", ""),
          ),
        });
      }
      galleryArray.push(sectionArray);
    }
    return galleryArray;
  }, [LIMIT, MODULO, shown]);

  return {
    loadedGallery,
    shown,
    setShown,
    currentlyRendered,
    setCurrentlyRendered,
    MODULO,
    LENGTH,
  };
};

export default useRenderGallery;
