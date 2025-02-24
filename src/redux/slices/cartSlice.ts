import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItemType } from "../../components/CartItem";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";

export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
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
    minusItem(state, action: PayloadAction<CartItemType>) {
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
    removeItem(state, action: PayloadAction<CartItemType>) {
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
    clearItems(state) {
      state.items = [];
    },
  },
});
export const selectCart = (state: RootState) => state.cartSlice;

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
