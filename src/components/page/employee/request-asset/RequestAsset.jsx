import React, { useEffect, useState } from "react";
import useAssets from "../../../../hooks/useAssets";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useEmRole from "../../../../hooks/useEmRole";
import HeaderTitle from "../../../../shared/header-title/HeaderTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import RequestAssetRow from "./RequestAssetRow";

const RequestAsset = () => {
  const [filterAsset, setFilterAsset] = useState("");
  const [assetsType, setAssetType] = useState("");
  const [assets, setAssets] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [isEmRole] = useEmRole();
  const {
    emImage,
    companyLogo,
    role: emRole,
    hrId,
    email,
    emCategory,
    emDetails,
    name,
  } = isEmRole;
  useEffect(() => {
    axiosSecure
      .get(
        `/assets?_id=${hrId}&search=${filterAsset}&type=${assetsType.trim()}`
      )
      .then((res) => {
        setAssets(res.data);
      });
  }, [filterAsset, assetsType, emRole]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilterAsset(e.target.value);
  };

  const handleCategory = (e) => {
    setAssetType(e.target.value);
  };

  const handleRequest = (image, productName, id, category, assetQuantity) => {
    const reqAsset = {
      emImage,
      emEmail: email,
      emName: name,
      hrId,
      emCategory,
      emDetails,
      requestDate: new Date(),
      productImage: image,
      productName,
      productId: id,
      category,
      status: "pending",
      requestQuantity: assetQuantity,
    };

    Object.setPrototypeOf(reqAsset, null);
    axiosSecure
      .post("/asset-request", reqAsset)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name}  your request  successfully send`,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.response.data.message}! already add`,
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  return (
    <div>
      <HeaderTitle title={"Request for an asset"} />

      <div className="mt-20 ">
        <div className="flex items-center justify-between mx-5 mb-5 border-b pb-2">
          <div>
            <select
              onChange={handleCategory}
              className="select select-bordered select-sm w-full max-w-xs"
              defaultValue={""}
            >
              <option selected value={""}>
                Filter by: category
              </option>
              <option value={"returnable"}>returnable</option>
              <option value={"non-returnable"}>non-returnable</option>
            </select>
          </div>
          <input
            onChange={handleSearch}
            className="border-2 border-gray-300 pl-2 rounded-lg outline-none w-80 h-10"
            type="search"
            name="searchAsset"
            placeholder="Search any assets"
          />
        </div>
      </div>

      <div className=" mb-20">
        <div className="">
          <table className="table text-center relative">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Image</th>
                <th>Asset name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                <>
                  {assets.map((item, index) => (
                    <RequestAssetRow
                      item={item}
                      index={index}
                      handleRequest={handleRequest}
                    />
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center absolute  left-1/3">
                  <h2 className="text-2xl">This asset not available😭</h2>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestAsset;
