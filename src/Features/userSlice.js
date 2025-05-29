import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: JSON.parse(localStorage.getItem("users")) || {
    users: [
      {
        id: "1",
        name: "user user",
        date: new Date().toLocaleString(),
        bills: [],
      },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state));
    },
    updateUser: (state, action) => {
      const user = state.users.find(({ id }) => id === action.payload.id);
      if (user) {
        user.name = action.payload.name;
        localStorage.setItem("users", JSON.stringify(state));
      }
    },
    addBillToUser: (state, action) => {
      const user = state.users.find(({id}) => id === action.payload.id);
      user.bills.push(action.payload.bill);
      localStorage.setItem("users", JSON.stringify(state));
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(({id}) => id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state));
    },
    removeBill: (state, action) => {
      const user = state.users.find(
        ({id}) => id === action.payload.userId
      );
      user.bills = user.bills.filter(({id}) => id !== action.payload.id);
      localStorage.setItem("users", JSON.stringify(state));
    },
  },
});

export const { addUser, removeUser, updateUser, addBillToUser, removeBill } =
  userSlice.actions;
export default userSlice.reducer;
