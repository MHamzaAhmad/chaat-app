import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import _ from "lodash";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload.payload;
    },
  },
});

export default UserSlice.reducer;

export const useUserActions = () => {
  const dispatch = useDispatch();
  return {
    checkIsAuthenticated: () => {
      if (_.isEmpty(localStorage.getItem("accessToken"))) {
        dispatch(UserSlice.actions.setIsAuthenticated(false));
        return;
      }
      dispatch(UserSlice.actions.setIsAuthenticated(true));
    },
    setIsAuthenticated: (val) => {
      dispatch(UserSlice.actions.setIsAuthenticated(val));
    },
  };
};
