import { create } from "zustand";

interface State {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

export const useStore = create<State>((set, get) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  getBears: () => get().bears,
}))