import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onewayTickets: [],
};

export const oneWayTicketsSlice = createSlice({
  name: "oneWayTicket",
  initialState,
  reducers: {
    oneWayTicketsInfo: (state, action) => {
      // state.agencyname=action.payload.agencyname
      state.onewayTickets= action.payload;
    },
    resetOnewayTicketsInfo: (state) => {
      state.onewayTickets= [];
    },
  },
});

export const { oneWayTicketsInfo, resetOnewayTicketsInfo } =
  oneWayTicketsSlice.actions;
export default oneWayTicketsSlice.reducer;
