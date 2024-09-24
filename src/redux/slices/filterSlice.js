import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  curPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
    setFilters(state, action) {
      state.curPage = Number(action.payload.curPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setCurPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
