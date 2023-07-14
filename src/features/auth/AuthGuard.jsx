import { useEffect } from "react";
import { useUser } from "../../redux/hooks";
import AuthComponent from "./AuthComponent";
import Navigation from "../../components/navigation";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, checkIsAuthenticated } = useUser();
  useEffect(() => {
    async function check() {
      await checkIsAuthenticated();
    }
    check();
  }, []);
  if (!isAuthenticated) return <AuthComponent />;

  return (
    <>
      <Navigation />
    </>
  );
};

export default AuthGuard;
