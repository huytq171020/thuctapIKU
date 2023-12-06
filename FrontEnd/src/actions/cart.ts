import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddToCart, DeleteCartItem, GetCartByUser } from "../api/Cart";
import { toast } from "react-toastify";
export const getCartByUser = createAsyncThunk(
  "cart/getCartByUser",
  async (_userId: string) => {
    try {
      const { data } = await GetCartByUser(_userId);
      return data;
    } catch (error: any) {
      console.log(error.message);
      toast.success(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cart: any) => {
    try {
      const { data } = await AddToCart(cart);
      console.log(data);
      toast.success(data.messages);
      return data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (_id: any) => {
    try {
      const { data } = await DeleteCartItem(_id);
      toast.success("Xóa sản phẩm thành công hàng thành công");
      return data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);