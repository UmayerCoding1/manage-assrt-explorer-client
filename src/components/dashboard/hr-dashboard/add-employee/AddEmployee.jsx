import React from "react";

import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Add } from "./../../../../provider/IconProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useRole from "../../../../hooks/useRole";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "./../../../../shared/sectionTitle/SectionTitle";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { createUser, logOut, signInUser, updateUserProfile } = useAuth();
  const [isRole] = useRole();
  const {
    _id,
    logo,
    companyName,
    memberPackage,
    email: hrEmail,
    password: hrPass,
  } = isRole;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const name = data.fullName;
    const email = data.email;
    const password = data.password;
    const dob = data.dob;
    const companyName = data.companyName;
    const emCategory = data.category;
    const emImage = res.data.data.display_url;
    const emDetails = data.emDetails;

    const employeeInfo = {
      name,
      email,
      password,
      dob,
      companyName,
      emCategory,
      emImage,
      emDetails,
      hrId: _id,
      companyLogo: logo,
      joinDate: Date(),
      memberPackage,
    };
    // remove prototype
    Object.setPrototypeOf(employeeInfo, null);

    axiosSecure
      .post("/add-employee", employeeInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Hr  your employee successfully added`,
            showConfirmButton: false,
            timer: 1000,
          });
          createUser(email, password)
            .then((result) => {
              const user = result.user;
              // update employee profile
              updateUserProfile(name, emImage)
                .then(() => {
                  logOut();
                })
                .catch((err) => {
                  console.log(err);
                });

              signInUser(hrEmail, hrPass)
                .then((result) => {
                  const user = result.user;
                })
                .catch((err) => console.log(err.code));
              reset();
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.code}`,
              });
            });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hr your Package is finish!",
        });
      });
  };
  return (
    <div>
      <SectionTitle header={"add employee"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 rounded-lg p-10 m-2"
      >
        <div className="flex items-center justify-between gap-3 my-5">
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <br />
            <input
              className="w-full h-14  border-2 border-gray-300 rounded-xl pl-2 outline-none"
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Type employee full name"
            />
          </div>
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <br />
            <input
              className="w-full h-14  border-2 border-gray-300 rounded-xl pl-2 outline-none"
              type="email"
              {...register("email", { required: true })}
              placeholder="Type employee email"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 my-5">
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="pass">
              Password
            </label>
            <br />
            <input
              className="w-full h-14  border-2 border-gray-300 rounded-xl pl-2 outline-none"
              type="password"
              {...register("password", { required: true })}
              placeholder="Type employee password"
            />
          </div>
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="dob">
              Date of barth
            </label>
            <br />
            <input
              className="w-full h-14 pr-5  border-2 border-gray-300 rounded-xl pl-2 outline-none"
              type="date"
              {...register("dob", { required: true })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 my-5">
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="cn">
              Company name
            </label>
            <br />
            <input
              className="w-full h-14  border-2 border-gray-300 rounded-xl pl-2 outline-none"
              type="text"
              {...register("companyName", { required: true })}
              placeholder="Type company name"
              defaultValue={companyName}
              readOnly
            />
          </div>

          <div className="w-1/2 mt-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register("category", { required: true })}
                label="Age"
                defaultValue={""}
              >
                <MenuItem value={"Font end developer"}>
                  Font end developer
                </MenuItem>
                <MenuItem value={"Back end developer"}>
                  Back end developer
                </MenuItem>
                <MenuItem value={"Data Entry Clerk"}>Data Entry Clerk</MenuItem>
                <MenuItem value={"Accountant"}>Accountant</MenuItem>
                <MenuItem value={"Database Administrator"}>
                  Database Administrator
                </MenuItem>
                <MenuItem value={"Software Engineer"}>
                  Software Engineer
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex   gap-6">
          <div className=" ">
            <label className="font-bold ml-3" htmlFor="emImg">
              Employee image
            </label>{" "}
            <br />
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-ghost  w-full max-w-xs border-2 bg-gray-200 border-gray-300"
            />
          </div>
          <div className=" ">
            <label className="font-bold ml-3" htmlFor="emInfo">
              Employee Information
            </label>{" "}
            <br />
            <textarea
              className="w-80 h-32 border-2 border-gray-300 rounded-xl resize-none outline-none p-2"
              {...register("emDetails", { required: true })}
              placeholder="Enter employee information"
            ></textarea>
          </div>
        </div>

        <div>
          <button
            className="btn btn-xs h-14 border-none text-lg bg-gradient-to-r from-[#e4cdcd] to-[#F2ECCA]"
            type="submit"
          >
            {" "}
            <Add /> Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
