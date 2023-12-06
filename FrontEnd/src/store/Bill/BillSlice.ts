import { createSlice } from "@reduxjs/toolkit";
import { addBill, getAllBill } from "../../actions/bill";
import { IBill } from "../../interface/Bill";

const initialState = {
  bills: [],
  isLoading: false,
  error: "",
} as { bills: any; isLoading: boolean; error: String };
export const BillSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBill.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bills = action.payload;
    });
    builder.addCase(getAllBill.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addBill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBill.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bills?.docs?.push(action.payload);
    });
    builder.addCase(addBill.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const BillReducer = BillSlice.reducer;
