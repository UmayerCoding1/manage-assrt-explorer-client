import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";
import Loading from "../../../shared/loading/Loading";

const HrDashBoardHome = () => {
    const [count,setCount] = useState({});
    const axiosSecure = useAxiosSecure();
    const [isRole,hrLoading]= useRole();
    const {_id}= isRole;
    const hrID = _id;
   useEffect(() => {
     axiosSecure.get(`/hr-manage-count?hrId=${hrID}`)
     .then(res => {
        setCount(res.data);
     })
   },[hrID])

   console.log(count);
   
     if(hrLoading){
        return <Loading/>
     }
    

    
  return (
    <div>
      <div className="flex items-center justify-evenly mt-5">
        <div className="w-44 h-28 bg-red-50 flex items-center justify-center text-2xl font-bold rounded-lg">EMPLOYEE: {count.employeeCount}</div>
        <div className="w-44 h-28 bg-red-50 flex items-center justify-center text-2xl font-bold rounded-lg">Assets: {count.assetCount}</div>        
      </div>
    </div>
  );
};

export default HrDashBoardHome;
