import React, { useState } from "react";

import SectionTitle from "../../../../shared/sectionTitle/SectionTitle";
import {
  DeleteIcon,
  FilterIcon,
  UpdateIcon,
} from "../../../../provider/IconProvider";
import useAssets from "../../../../hooks/useAssets";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AssetList = () => {
  const [filterAsset, setFilterAsset] = useState("");
  const [assetsType, setAssetType] = useState("");
  const axiosSecure = useAxiosSecure();
  const [assets, refetch] = useAssets(filterAsset, assetsType);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilterAsset(e.target.value);
  };

  const handleCategory = (e) => {
    setAssetType(e.target.value);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/assets/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <SectionTitle header={"assets list"} />

      <div className="flex items-center justify-between mx-5 mb-5 border-b pb-2">
        <div>
          <select
            onChange={handleCategory}
            defaultValue={""}
            className="select select-bordered select-sm w-full max-w-xs"
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
      <div>
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
                <th>Added Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                <>
                  {assets.map((item, i) => {
                    return [
                      <tr>
                        <th>{i + 1}</th>
                        <td className="flex items-center justify-center">
                          <img className="w-20" src={item.image} alt="" />
                        </td>
                        <td>
                          <h2 className="font-semibold ">
                            {" "}
                            {item.productName}
                          </h2>
                        </td>
                        <td>
                          <h2 className="font-semibold "> {item.category}</h2>
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          <p>{item.added_Date}</p>
                        </td>
                        <th>
                          <Link to={`/update-asset/${item._id}`}>
                            <button className="text-2xl mr-4 text-blue-500">
                              <UpdateIcon />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-2xl mr-4 text-red-500"
                          >
                            <DeleteIcon />
                          </button>
                        </th>
                      </tr>,
                    ];
                  })}
                </>
              ) : (
                <div className="flex items-center justify-center absolute bottom-[-100px] left-1/3">
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

export default AssetList;
