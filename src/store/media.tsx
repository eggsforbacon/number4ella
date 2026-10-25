import { create } from "zustand";
import { MediaProps } from "./gallery";

interface MediaStore {
  isActive: boolean;
  toggleIsActive: () => void;
  active: MediaProps | null;
  setActive: (p: MediaProps) => void;
  resetActive: () => void;
}

const useMedia = create<MediaStore>((set, get) => ({
  isActive: false,
  toggleIsActive: () => set(() => ({ isActive: !get().isActive })),
  active: null,
  setActive: (active: MediaProps) => set(() => ({ active })),
  resetActive: () => set(() => ({active: null, isActive: false}))
}));

export default useMedia;
