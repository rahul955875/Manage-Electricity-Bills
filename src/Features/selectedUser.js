import { createSlice } from "@reduxjs/toolkit";

const selectedUser = createSlice({
  name: "selectedUser",
  initialState: {},
  reducers: {
    selectUser: (_, action) => {
      return action.payload;
    },
    deSelectUser: () => {
      return {};
    },
  },
});

export const { selectUser, deSelectUser } = selectedUser.actions;
export default selectedUser.reducer;
