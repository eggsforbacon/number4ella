import {create} from 'zustand';
import {BIRTHDAY} from "@/const/common";

const TODAY = new Date(Date.now());

interface Store {
    today: Date;
    isTodayBirthday: boolean;
    isLetterOpen: boolean;
    letterRead: boolean;
    setLetterRead: (letterRead: boolean) => void;
    setIsLetterOpen: (isLetterOpen: boolean) => void;
    galleryLetter: boolean;
    toggleGalleryLetter: () => void;
    upperBound: number | "";
    lowerBound: number | "";
    setUpperBound: (upperBound: number | "") => void;
    setLowerBound: (lowerBound: number | "") => void;
}

export const useStore = create<Store>((set) => ({
    today: TODAY,
    isTodayBirthday: TODAY.getUTCDate() === BIRTHDAY.getUTCDate() && TODAY.getUTCMonth() === BIRTHDAY.getUTCMonth(),
    isLetterOpen: false,
    letterRead: false,
    setIsLetterOpen: (isLetterOpen: boolean) => set(() => ({isLetterOpen})),
    galleryLetter: false,
    setLetterRead: (letterRead: boolean) => set(() => ({letterRead})),
    toggleGalleryLetter: () => set((state) => ({galleryLetter: !state.galleryLetter})),
    upperBound: "",
    lowerBound: "",
    setUpperBound: (upperBound: number | "") => set(() => ({upperBound})),
    setLowerBound: (lowerBound: number | "") => set(() => ({lowerBound})),
}));