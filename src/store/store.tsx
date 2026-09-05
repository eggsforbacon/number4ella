import {create} from 'zustand';
import {ANNIVERSARY, BIRTHDAY, MAGIC_VERSARY} from "@/const/common";
import {ValidLetterDate} from "@/enums/common";
import {ReactNode} from "react";

const TODAY = new Date(Date.now());

interface Store {
    today: Date;
    isTodayBirthday: boolean;
    isTodayMagicversary: boolean;
    isTodayAnniversary: boolean;
    activeLetter: {date: ValidLetterDate, letter: ReactNode};
    isMailboxOpen: boolean;
    mailboxRead: boolean;
    setLetterRead: (letterRead: boolean) => void;
    setActiveLetter: (activeLetter: {date: ValidLetterDate, letter: ReactNode}) => void;
    setMailboxOpen: (mailboxOpen: boolean) => void;
    galleryLetter: boolean;
    toggleGalleryLetter: () => void;
    upperBound: number | "";
    lowerBound: number | "";
    setUpperBound: (upperBound: number | "") => void;
    setLowerBound: (lowerBound: number | "") => void;
    result: number;
    setResult: (result: number) => void;
    showLetter: boolean;
    setShowLetter: (showLetter: boolean) => void;
}

export const useStore = create<Store>((set) => ({
    today: TODAY,
    isTodayBirthday: TODAY.getUTCDate() === BIRTHDAY.getUTCDate() && TODAY.getUTCMonth() === BIRTHDAY.getUTCMonth(),
    isTodayMagicversary: TODAY.getUTCDate() === MAGIC_VERSARY.getUTCDate() && TODAY.getUTCMonth() === MAGIC_VERSARY.getUTCMonth(),
    isTodayAnniversary: TODAY.getUTCDate() === ANNIVERSARY.getUTCDate() && TODAY.getUTCMonth() === ANNIVERSARY.getUTCMonth(),
    activeLetter: {date: ValidLetterDate.NONE, letter: ""},
    isMailboxOpen: false,
    mailboxRead: false,
    setActiveLetter: (activeLetter: {date: ValidLetterDate, letter: ReactNode}) => set(() => ({activeLetter})),
    galleryLetter: false,
    setLetterRead: (letterRead: boolean) => set(() => ({mailboxRead: letterRead})),
    setMailboxOpen: (isMailboxOpen: boolean) => set(() => ({isMailboxOpen})),
    toggleGalleryLetter: () => set((state) => ({galleryLetter: !state.galleryLetter})),
    upperBound: "",
    lowerBound: "",
    setUpperBound: (upperBound: number | "") => set(() => ({upperBound})),
    setLowerBound: (lowerBound: number | "") => set(() => ({lowerBound})),
    result: -1,
    setResult: (result: number) => set(() => ({result})),
    showLetter: false,
    setShowLetter: (showLetter: boolean) => set(() => ({showLetter})),
}));