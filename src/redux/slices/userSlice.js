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
    setUser: (state, payload) => {
      state.user = payload.payload;
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

  const getCurrentUser = async () => {
    const user = await userService.getCurrentUser();
    if (_.isUndefined(user)) return;
    dispatch(UserSlice.actions.setUser(user.user));
  };
  return {
    initializeUserState: async () => {
      const chats = await userService.getChats();
      dispatch(UserSlice.actions.setChats(chats));
      if (!_.isEmpty(chats)) {
        dispatch(UserSlice.actions.setSubject(chats[0]));
      }
    },
    getCurrentUser,
    checkIsAuthenticated: async function () {
      if (_.isEmpty(localStorage.getItem("accessToken"))) {
        dispatch(UserSlice.actions.setIsAuthenticated(false));
        return;
      }
      dispatch(UserSlice.actions.setIsAuthenticated(true));
      await getCurrentUser();
    },
    setIsAuthenticated: (val) => {
      dispatch(UserSlice.actions.setIsAuthenticated(val));
    },
    setSubject: (val) => {
      dispatch(UserSlice.actions.setSubject(val));
    },
    login: async () => {
      dispatch(UserSlice.actions.setIsAuthenticated(true));
      await getCurrentUser();
    },
    logout: () => {
      dispatch(UserSlice.actions.setUser({}));
      dispatch(UserSlice.actions.setIsAuthenticated(false));
      dispatch(UserSlice.actions.setSubject({}));
      dispatch(UserSlice.actions.setChats([]));
    },
  };
};
