import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { useUserService } from "../../services/userService";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    user: {},
    isAuthenticated: false,
    subject: {},
    chats: [],
  },
  reducers: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload.payload;
    },
    setSubject: (state, payload) => {
      state.subject = payload.payload;
    },
    setChats: (state, payload) => {
      state.chats = payload.payload;
    },
  },
});

export default UserSlice.reducer;

export const useUserActions = () => {
  const dispatch = useDispatch();
  const { userService } = useUserService();
  return {
    initializeUserState: async () => {
      const chats = await userService.getChats();
      dispatch(UserSlice.actions.setChats(chats));
      if (!_.isEmpty(chats)) {
        dispatch(UserSlice.actions.setSubject(chats[0]));
      }
    },
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
    setSubject: (val) => {
      dispatch(UserSlice.actions.setSubject(val));
    },
  };
};
