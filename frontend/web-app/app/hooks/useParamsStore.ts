import { createWithEqualityFn } from "zustand/traditional";

type State = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  searchTerm: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
};

const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: "",
};

export const useParamsStore = createWithEqualityFn<State & Actions>((set) => ({
  ...initialState,

  setParams(newParams: Partial<State>) {
    set((state) => {
      if ("pageNumber" in newParams) {
        return { ...state, ...newParams };
      } else {
        return { ...state, ...newParams, pageNumber: 1 };
      }
    });
  },

  reset: () => set(initialState),
}));
