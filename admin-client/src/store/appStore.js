import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set, get) => ({
	activeWindow: "settings",
	setActiveWindow: (window) => set({ activeWindow: window }),
});

export const useAppStore = create(devtools(store));
