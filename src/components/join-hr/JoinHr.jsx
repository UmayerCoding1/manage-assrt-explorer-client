import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye as EyeOn } from "react-icons/fa";
import { IoMdEyeOff as EyeOff } from "react-icons/io";
import SocialLink from "./../../shared/social-link/SocialLink";
import { Link, useNavigate } from "react-router-dom";
import { mainLogo } from "../../provider/ImageProvider";
import useAuth from "../../hooks/useAuth";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const JoinHr = () => {
  const [showPass, setShowPass] = useState(true);
  const { createUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
    const companyName = data.company_name;
    const logo = res.data.data.display_url;
    const memberPackage = data.package;

    const hrInfo = {
      name,
      email,
      password,
      dob,
      companyName,
      logo,
      memberPackage,
    };

    createUser(email, password)
      .then(async (result) => {
        const res = await axiosSecure.post("/register-hr", hrInfo);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Hr successfully joined",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/payment");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.code}!`,
        });
      });
    reset();
  };

  const handleEm = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };
  return (
    <>
      <div className="ml-2 mt-2">
        <Link to={"/"}>
          <img className="w-20" src={mainLogo} alt="" />
        </Link>
      </div>

      <div className="p-2 lg:flex items-center justify-center">
        <div className="lg:w-1/2">
          <DotLottieReact
            src="https://lottie.host/9fea7d91-4624-4928-910d-bc03be850585/wru9Qt5nCo.json"
            loop
            autoplay
          />
        </div>

        <div className="lg:w-1/2">
          <form
            onSubmit={handleEm}
            className="border-2 border-black rounded-lg p-10 "
          >
            <h2 className="text-4xl text-center font-bold">Join as a HR</h2>
            <div className="mt-5">
              <label className="font-bold" htmlFor="email">
                Full name
              </label>
              <br />
              <input
                className="border-2 border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
                type="text"
                {...register("fullName", { required: true })}
                placeholder="Type full name"
              />
              {errors.fullName?.type === "required" && (
                <span className="font-bold text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="mt-5">
              <label className="font-bold" htmlFor="Email">
                Email
              </label>
              <br />
              <input
                className="border-2 border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
                type="email"
                {...register("email", { required: true })}
                placeholder="Type your email"
              />
              {errors.email?.type === "required" && (
                <span className="font-bold text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="mt-5 relative">
              <label className="font-bold" htmlFor="pass">
                Password
              </label>
              <br />
              <input
                className="border-2 border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
                type={showPass ? "password" : "text"}
                {...register("password", { required: true, maxLength: 8 })}
                placeholder="Type Password"
              />
              {errors.password?.type === "required" && (
                <span className="font-bold text-xs text-red-500">
                  This field is required
                </span>
              )}
              {errors.password?.type == "maxLength" && (
                <span className="font-bold text-xs text-red-500">
                  Password must be 8 characters
                </span>
              )}

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute top-[50px] right-4 text-lg"
              >
                {showPass ? <EyeOn /> : <EyeOff />}
              </button>
            </div>

            <div className="mt-5">
              <label className="font-bold" htmlFor="full name">
                Date of birth
              </label>
              <br />
              <input
                className="border-2 pr-5 cursor-pointer border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
                type="date"
                {...register("dob", { required: true })}
                placeholder="Type full name"
              />
              {errors.dob?.type === "required" && (
                <span className="font-bold text-xs text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="mt-5 mr-1 w-full">
                <label className="font-bold" htmlFor="Email">
                  Company Name
                </label>
                <br />
                <input
                  className="border-2 border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
                  type="text"
                  {...register("company_name", { required: true })}
                  placeholder="Type your Company name"
                />
              </div>

              <div className="mt-10 ">
                <label className="font-bold ml-3" htmlFor="Email">
                  Company logo
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input file-input-ghost w-full max-w-xs border-2 border-black"
                />
              </div>
            </div>

            <div className="w-1/2 mt-5">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select a package
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("package", { required: true })}
                  label="Age"
                  defaultValue={""}
                >
                  <MenuItem value={"5"}>5 Member in $5</MenuItem>
                  <MenuItem value={"8"}>10 Member is $8</MenuItem>
                  <MenuItem value={"15"}>20 Member is $15</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mt-5">
              <input
                className="w-full h-16 rounded-lg cursor-pointer bg-blue-500 text-white "
                type="submit"
                value="Sign Up"
              />
            </div>

            <div className="mt-5">
              <SocialLink />
            </div>
            <p className="font-bold mt-5 text-xs">
              You have a already account please?{" "}
              <Link to={"/login"}>
                <span className="text-blue-500">Sign In</span>
              </Link>
              , or{" "}
              <Link to={"/join-employee"}>
                <span className="text-blue-500">Join as employee</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinHr;
