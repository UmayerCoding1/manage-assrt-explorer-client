import React, { useEffect, useState } from "react";
import SectionTitle from "./../../../../shared/sectionTitle/SectionTitle";
import useRole from "./../../../../hooks/useRole";
import Loading from "./../../../../shared/loading/Loading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ApproveIcon } from "../../../../provider/IconProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const AllRequest = () => {
  const [isRole, hrLoading] = useRole();
  const { _id: hrId } = isRole;
  const axiosSecure = useAxiosSecure();

  const { data: MyEmployeeReq = [], refetch } = useQuery({
    queryKey: ["MyEmployeeReq"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset-request?hrId=${hrId}`);
      return res.data;
    },
  });
console.log(MyEmployeeReq);

  if (hrLoading) {
    return <Loading />;
  }

  const handleApproved = (id, productId, requestQuantity,emName) => {
    console.log('click');
    
    axiosSecure.patch(`/asset-request/${id}?productId=${productId}`, { requestQuantity })
      .then((res) => {
        if (res.data.matchedCount > 0) {
          Swal.fire({
            title:`${emName} your request successfully approved` ,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          refetch();
        }
      });

    // axiosSecure.patch(`/asset-request/${id}?productId=${productId}`)
    // .then(res => console.log(res.data));
  };

  return (
    <div>
      <SectionTitle header={"all employee asset request"} />
      <div>
        
      </div>
      {MyEmployeeReq.length > 0 ? (
        <div className="m-16 mt-2">
          {MyEmployeeReq.map((asset) => {
            const {
              productImage,
              productName,
              category,
              requestDate,
              status,
              _id,
              productId,
              requestQuantity,
              emName
            } = asset;
            return [
              <>
                {status !== "approved" && (
                  <div className="flex items-center justify-between border-b-2 border-gray-300 mt-4">
                    <div className="flex items-center">
                      <img className="w-36 mr-2" src={productImage} alt="" />
                      <div>
                        <h2 className="text-lg font-bold">{productName}</h2>
                        <p className="text-xs text-gray-500">
                          Type: {category}
                        </p>
                        <p className="text-xs text-gray-500">
                          Request date: {requestDate}
                        </p>
                        {requestQuantity && (
                          <p className="text-xs text-gray-500">
                            Quantity: {requestQuantity}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      {status === "pending" && (
                        <div>
                          <button
                            onClick={() =>
                              handleApproved(_id, productId, requestQuantity,emName)
                            }
                            className="btn btn-sm mt-2 w-32 bg-[#4CAF50] text-white hover:bg-[#4CAF50]"
                          >
                            Approved
                          </button>{" "}
                          <br />
                          <button className="btn btn-sm mt-2 w-32 bg-[#5D4037] text-white hover:bg-red-500">
                            Reject
                          </button>
                        </div>
                      )}

                      {status === "approved" && (
                        <button>
                          <ApproveIcon />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>,
            ];
          })}
        </div>
      ) : (
        "not avv.."
      )}
    </div>
  );
};

export default AllRequest;
