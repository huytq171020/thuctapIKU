import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBill } from "../interface/Bill";
import { GetAllBill, AddBill, UpdateBill } from "../api/bill";
import { toast } from "react-toastify";
export const getAllBill = createAsyncThunk("bill/getAllBill", async () => {
  try {
    const { data } = await GetAllBill();
    const bills = data.bills;
    return bills;
  } catch (error) {
    return error;
  }
});
export const addBill = createAsyncThunk(
  "bill/addBill",
  async (bill: any, { rejectWithValue }) => {
    try {
      const { data } = await AddBill(bill);
      toast.success(data.message);
      const billData = data.bill;
      return billData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBill = createAsyncThunk(
  "bill/updateBill",
  async (bill: any, { rejectWithValue }) => {
    try {
      const { data } = await UpdateBill(bill);
      toast.success(data.message);
      const billData = data.bill;
      return billData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
