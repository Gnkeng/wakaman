import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null
};

export const customerSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    customerInfo: (state, action) => {
      // state.username=action.payload.username
      state= action.payload
    },
    resetCustomerInfo: (state) => {
      state.user=null
    },
  },
});

export const { customerInfo, resetCustomerInfo } = customerSlice.actions;
export default customerSlice.reducer;
