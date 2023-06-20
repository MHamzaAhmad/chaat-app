import { useSelector } from "react-redux";
import { useUserActions } from "./slices/userSlice";

export const useUser = () => ({
  ...useSelector((state) => state.UserSlice),
  ...useUserActions(),
});
