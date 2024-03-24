import { createWithEqualityFn } from "zustand/traditional";

type State = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  searchTerm: string;
  searchValue: string;
  orderBy: string;
  filterBy: string;
  seller?: string;
  winner?: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
  setSearchValue: (value: string) => void;
};

const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: "",
  searchValue: "",
  orderBy: "make",
  filterBy: "",
  seller: undefined,
  winner: undefined,
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
  setSearchValue: (value: string) => {
    set({ searchValue: value });
  },
}));
