import { createSlice, current } from "@reduxjs/toolkit";

const selectedBill = createSlice({
  name: "selectedBill",
  initialState: {
    id: "",
    currentUnits: "",
    previousUnits: "",
    rate: "",
    date: "",
  },
  reducers: {
    selectBill: (state, action) => {
      return action.payload;
    },
    deSelectBill: () => {
      return {
        id: "",
        currentUnits: "",
        previousUnits: "",
        rate: "",
        date: "",
      };
    },
  },
});

export const { selectBill, deSelectBill } = selectedBill.actions;
export default selectedBill.reducer;
