import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goCameTickets: [],
};

export const goCameTicketsSlice = createSlice({
  name: "oneWayTicket",
  initialState,
  reducers: {
    goCameTicketsInfo: (state, action) => {
      // state.agencyname=action.payload.agencyname
      state.onewayTickets= action.payload;
    },
    resetGoCameTicketsInfo: (state) => {
      state.onewayTickets= [];
    },
  },
});

export const { goCameTicketsInfo,resetGoCameTicketsInfo } =
  goCameTicketsSlice.actions;
export default goCameTicketsSlice.reducer;