import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./slices/userSlice";

const reducers = combineReducers({
  UserSlice,
});

export default reducers;
