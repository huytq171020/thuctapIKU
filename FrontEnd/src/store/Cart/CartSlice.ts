import { createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteCartItem, getCartByUser } from "../../actions/cart";

const initialState = {
  carts: [],
  error: "",
  isLoading: false,
} as { carts: any; isLoading: boolean; error: string };

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get All Cart
    builder.addCase(getCartByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartByUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.carts = action.payload.carts;
    });
    builder.addCase(getCartByUser.rejected, (state) => {
      state.isLoading = false;
    });
    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      return {
        ...state,
        carts: [...state.carts, action.payload.carts],
      };
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
    });
    // Add to cart
    builder.addCase(deleteCartItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.carts = state.carts.filter(
        (c: any) => c._id !== action.payload._id
      );
    });
    builder.addCase(deleteCartItem.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const CartReducer = CartSlice.reducer;