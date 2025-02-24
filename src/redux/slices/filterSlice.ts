import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sort = {
  name: string;
  sortProperty: "rating" | "title" | "price";
};

export interface FilterSliceState {
  categoryId: number;
  curPage: number;
  sort: Sort;
  searchValue: string;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  curPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurPage(state, action: PayloadAction<number>) {
      state.curPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.curPage = Number(action.payload.curPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
