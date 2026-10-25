import { create } from 'zustand';

interface Generator {
  upperBound: number | "";
  lowerBound: number | "";
  setUpperBound: (upperBound: number | "") => void;
  setLowerBound: (lowerBound: number | "") => void;
  result: number;
  setResult: (result: number) => void;
}

export const useGenerator = create<Generator>((set) => ({
  upperBound: "",
  lowerBound: "",
  setUpperBound: (upperBound: number | "") => set(() => ({upperBound})),
  setLowerBound: (lowerBound: number | "") => set(() => ({lowerBound})),
  result: -1,
  setResult: (result: number) => set(() => ({result})),
}));
