import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agency:null
};

export const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    agencyInfo: (state, action) => {
      // state.username=action.payload.username
      state.agency= action.payload
    },
    resetAgencyInfo: (state) => {
      state.agency=null
    },
  },
});

export const { agencyInfo, resetAgencyInfo } = agencySlice.actions;
export default agencySlice.reducer;