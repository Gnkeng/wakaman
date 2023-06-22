import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer:null
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerInfo: (state, action) => {
      // state.agencyname=action.payload.agencyname
      state.customer= action.payload
    },
    resetCustomerInfo: (state) => {
      state.customer=null
    },
  },
});

export const { customerInfo, resetCustomerInfo } = customerSlice.actions;
export default customerSlice.reducer;
