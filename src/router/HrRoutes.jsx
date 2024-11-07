import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../shared/loading/Loading";

const HrRoutes = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const [isRole, hrLoading] = useRole();
  const { role } = isRole;
  const location = useLocation();
  if (loading || hrLoading) {
    return <Loading />;
  }

  if (user && role === "hr") {
    return children;
  }
  if (user && role !== "hr") {
    logOut();
  }

  return <Navigate to={"/login"} state={{ from: location.pathname }} replace />;
};

export default HrRoutes;
