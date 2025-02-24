import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Sort } from "./filterSlice";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  types: number[];
};

export interface PizzaSliceState {
  items: Array<Pizza>;
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: {
    curPage: number;
    category: string;
    sort: Sort;
    search: string;
  }) => {
    const { curPage, category, sort, search } = params;
    const { data } = await axios.get<Array<Pizza>>(
      `https://66dfe34a2fb67ac16f276c3c.mockapi.io/items?page=${curPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=desc${search}`
    );
    return data as Array<Pizza>;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<Array<Pizza>>) => {
          state.items = action.payload;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
