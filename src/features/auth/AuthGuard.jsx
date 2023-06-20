import { useEffect } from "react";
import { useUser } from "../../redux/hooks";
import AuthComponent from "./AuthComponent";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, checkIsAuthenticated } = useUser();
  useEffect(() => {
    checkIsAuthenticated();
  }, []);
  if (!isAuthenticated) return <AuthComponent />;

  return <>{children}</>;
};

export default AuthGuard;
