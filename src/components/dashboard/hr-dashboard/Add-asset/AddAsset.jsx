import React from "react";
import SectionTitle from "../../../../shared/sectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { IoMdCloudUpload as Upload } from "react-icons/io";
import { Add } from "./../../../../provider/IconProvider";
import axios from "axios";
import useRole from "../../../../hooks/useRole";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddAsset = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isRole] = useRole();
  const { _id } = isRole;
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const productName = data.productName;
    const quantity = data.productQuantity;
    const category = data.category;
    const image = res.data.data.display_url;

    const assetInfo = {
      productName,
      quantity: parseInt(quantity),
      category,
      image,
      hrId: _id,
      added_Date: new Date().toISOString().split("T")[0],
    };

    //  post an a asset
    axiosSecure.post("/add-asset", assetInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Hr  your asset  successfully added`,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        alert(res.data);
      }
    });

    reset();
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div>
      <SectionTitle header={"add an asset"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-32 mt-10 border-2 border-gray-300 p-5 rounded-lg"
      >
        <section className="lg:flex items-center justify-between gap-5 my-5">
          <div className="w-1/2">
            <label className="font-bold pl-2" htmlFor="product-name">
              Product name
            </label>{" "}
            <br />
            <input
              className="w-full h-14 border-2 border-gray-400 rounded-xl pl-2  "
              type="text"
              {...register("productName", { required: true })}
              placeholder="Enter product name"
            />
          </div>

          <div className="w-1/2">
            <label className="font-bold pl-2" htmlFor="product-name">
              Product quantity
            </label>{" "}
            <br />
            <input
              className="w-full h-14 border-2 border-gray-400 rounded-xl pl-2 outline-none "
              type="number"
              {...register("productQuantity", { required: true })}
              placeholder=" product quantity"
            />
          </div>
        </section>

        <section className="lg:flex items-center justify-between gap-5 my-5">
          <div className="w-1/2 ">
            <label className="font-bold pl-2" htmlFor="product-name">
              Product type
            </label>{" "}
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register("category", { required: true })}
                label="Age"
                className="bg-white"
                defaultValue={""}
              >
                <MenuItem value={"returnable"}>Returnable</MenuItem>
                <MenuItem value={"non-returnable"}>Non-returnable</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="w-1/2 ">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<Upload />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                multiple
                {...register("image", { required: true })}
              />
            </Button>
          </div>
        </section>

        <div>
          <button
            className="btn btn-xs h-14 border-none text-lg bg-gradient-to-r from-[#e4cdcd] to-[#F2ECCA]"
            type="submit"
          >
            {" "}
            <Add /> Add an asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
