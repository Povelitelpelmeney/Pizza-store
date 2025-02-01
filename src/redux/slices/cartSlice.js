import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      if (findItem) {
        if (findItem.count > 1) findItem.count--;
        else {
          const temp = state.items.indexOf(findItem);
          state.items.splice(temp, 1);
        }
      }
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      if (findItem) {
        const temp = state.items.indexOf(findItem);
        state.items.splice(temp, 1);
      }
    },
    clearItems(state, action) {
      state.items = [];
    },
  },
});
export const selectCart = (state) => state.cartSlice;

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
