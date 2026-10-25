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
    showLetter: boolean;
    setShowLetter: (showLetter: boolean) => void;
}

export const useLetters = create<Store>((set) => ({
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
    showLetter: false,
    setShowLetter: (showLetter: boolean) => set(() => ({showLetter})),
}));
