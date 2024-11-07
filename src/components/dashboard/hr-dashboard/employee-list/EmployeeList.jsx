import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import EmployeeListTable from "./EmployeeListTable";
import useRole from "./../../../../hooks/useRole";
import Loading from "./../../../../shared/loading/Loading";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [isRole] = useRole();

  useEffect(() => {
    const employeeData = async () => {
      setLoading(true);
      const res = await axiosSecure.get(`/employee?hrId=${isRole._id}`);
      if (res.data) {
        setLoading(false);
      }
      return setEmployees(res.data);
    };

    employeeData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="my-5 border-b-2 pb-2 mx-4 flex items-center justify-between">
        <input
          className="w-64 h-8 border-2 border-gray-300 outline-none rounded-lg text-xs pl-2"
          type="search"
          placeholder="Search an employee "
        />
        <Link to={'/dashboard/add-employee'}><button className="btn btn-sm btn-primary">Add Employee</button></Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Email</th>
              <th>EmployeeID</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((em, i) => (
              <EmployeeListTable employee={em} i={i + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
