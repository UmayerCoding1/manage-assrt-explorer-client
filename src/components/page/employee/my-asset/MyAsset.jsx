import React, { useState } from "react";
import HeaderTitle from "../../../../shared/header-title/HeaderTitle";
import useMyAsset from "../../../../hooks/useMyAsset";
import Loading from "./../../../../shared/loading/Loading";
import {
  ApproveIcon,
  Print,
  ReturnIcon,
} from "../../../../provider/IconProvider";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfFile from "../../pdf/PdfFile";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const MyAsset = () => {
  const [assetsStatus, setAssetsStatus] = useState("");
  const [assetsSearch, setAssetsSearch] = useState("");
  const [MyAssets, isLoading,refetch] = useMyAsset(assetsStatus, assetsSearch);
  const axiosSecure = useAxiosSecure();

  if (isLoading) {
    return <Loading />;
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setAssetsSearch(e.target.value);
  };

  const handleCategory = (e) => {
    setAssetsStatus(e.target.value);
  };

  const handleAssetReturn = async (id,productId) => {
    const res = await axiosSecure.put(`/asset-request/${id}?productId=${productId}`);
     if(res.data.modifiedCount){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "asset successfully returned ",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
     }

     


  };

  return (
    <div>
      <HeaderTitle title={"my asset"} />

      <div>
        <div>
          <div className="mt-20 ">
            <div className="flex items-center justify-between mx-5 mb-5 border-b pb-2">
              <div>
                <select
                  value={assetsStatus}
                  onChange={handleCategory}
                  className="select select-bordered select-sm w-full max-w-xs"
                  defaultValue={''}
                >
                  <option selected value={""}>
                    Filter by: Status
                  </option>
                  <option value={"approved"}>Approved</option>
                  <option value={"pending"}>Pending</option>
                </select>
              </div>
              <div>
                <input
                  value={assetsSearch}
                  onChange={handleSearch}
                  className="border-2 border-gray-300 pl-2 rounded-lg outline-none w-80 h-10"
                  type="search"
                  placeholder="Search any assets"
                />
              </div>
            </div>
          </div>
        </div>

        {MyAssets.length > 0 ? (
          <div className="m-16 mt-2">
            {MyAssets.map((asset) => {
              const {
                productImage,
                productName,
                category,
                requestDate,
                status,
                approved_Date,
                requestQuantity,
                _id,
                productId
              } = asset;
              return [
                <div className="flex items-center justify-between border-b-2 border-gray-300 mt-4">
                  <div className="flex items-center">
                    <img className="w-36 mr-2" src={productImage} alt="" />
                    <div>
                      <h2 className="text-lg font-bold">{productName}</h2>
                      <p className="text-xs text-gray-500">Type: {category}</p>
                      <p className="text-xs text-gray-500">
                        Request date: {requestDate}
                      </p>
                      {approved_Date && (
                        <p className="text-xs text-gray-500">
                          Approved Date: {approved_Date}
                        </p>
                      )}
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
                        <button className="p-1 rounded-lg mt-2 w-32 bg-[#005BBB] text-white hover:bg-[#005BBB]">
                          {status}
                        </button>{" "}
                        <br />
                        <button className="btn btn-sm mt-2 w-32 bg-red-500 text-white hover:bg-red-500">
                          Clear
                        </button>
                      </div>
                    )}
                    {status === "approved" && (
                      <div>
                        <button className="p-1 btn btn-sm rounded-lg mt-2 w-32  bg-[#4CAF50] text-white hover:bg-[#4CAF50]">
                          <ApproveIcon /> {status}
                        </button>{" "}
                        <br />
                        
                        <PDFDownloadLink
                          document={<PdfFile asset={asset} />}
                          fileName="assetData.pdf"
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? (
                              <button className="btn btn-sm bg-[#3A4A69] mt-2 w-32 hover:bg-[#3A4A69] text-white">
                                <Print />
                                Loading document...
                              </button>
                            ) : (
                              <button className="btn btn-sm bg-[#3A4A69] mt-2 w-32 hover:bg-[#3A4A69] text-white">
                                <Print /> Print
                              </button>
                            )
                          }
                        </PDFDownloadLink>{" "}
                        <br />
                        {category === "returnable" && (
                          <button
                            onClick={() => handleAssetReturn(_id,productId)}
                            className="btn btn-sm btn-outline mt-2 w-32 bg-[#008080] text-white hover:bg-[#008080]  mb-1"
                          >
                            <ReturnIcon /> return
                          </button>
                        )}
                        {category !== "returnable" && (
                          <button className="btn btn-sm mt-2 w-32 bg-red-500 text-white hover:bg-red-500">
                          Clear
                        </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>,
              ];
            })}
          </div>
        ) : (
          "not avv.."
        )}
      </div>
    </div>
  );
};

export default MyAsset;
