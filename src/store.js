import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/userSlice";
import selectedBillReducer from "./Features/selectedBill";
import selectedUserReducer from "./Features/selectedUser";
export const store = configureStore({
  reducer: {
    users: userReducer,
    selectedBill: selectedBillReducer,
    selectedUser: selectedUserReducer,
  },
});
