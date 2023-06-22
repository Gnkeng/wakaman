import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customer/customerSlice";
import agencyReducer from "./agency/agencySlice";
import oneWayTicketsReducer from './oneWayTickets/oneWayTicketsSlice'
import goCameTicketsReducer from './goCameTickets/goCameTicketsSlice'

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    agency:agencyReducer,
    oneWayTickets:oneWayTicketsReducer,
    goCameTickets:goCameTicketsReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
