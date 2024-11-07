import React from "react";
import Banner from "../without-login/banner/Banner";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import HrHome from "../hr/HrHome";
import WithOutLogin from "../without-login/WithOutLogin";
import Admin from "../../dashboard/admin/Admin-home/Admin";
import useEmRole from "../../../hooks/useEmRole";
import EmHome from "../employee/em-home/EmHome";

const Home = () => {
  const { user } = useAuth();
  const [isRole] = useRole();
  const { role, paymentStatus } = isRole;
  const [isEmRole] = useEmRole();
  const { role: emRole } = isEmRole;

  return (
    <div>
      
      {user && role === "admin" ? <Admin /> : ""}
      {!paymentStatus}
      {user && role === "hr" ? <HrHome /> : ""}
      {user && emRole === "employee" ? <EmHome /> : ""}
      {!user && <WithOutLogin />}
    </div>
  );
};

export default Home;
