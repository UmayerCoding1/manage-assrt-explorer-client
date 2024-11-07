import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import SocialLink from "../../shared/social-link/SocialLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const {signInUser}= useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateForm = location.state?.form?.pathname || '/';


  const  handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email=form.email.value;
    const password = form.password.value;
    
    signInUser(email,password)
    .then(result => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome!`,
        showConfirmButton: false,
        timer: 1000
      });
      navigate(navigateForm);
    })
    .catch(error => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `something is issue! 😐 please try again`,
        showConfirmButton: false,
        timer: 1000
      });
    })
  }
  return (
    <div className=" lg:flex items-center h-screen bg-[#f5e9d475]">
      <div className="pt-20 lg:pt-0 lg:w-1/2  ">
        <DotLottieReact
          src="https://lottie.host/076bbf2c-23da-4f45-99be-0a0d1968cd47/fxmJFZsuCd.json"
          loop
          autoplay
        />
      </div>

      <div className=" w-full  lg:mr-10 lg:w-1/3">
        <form onSubmit={handleLogin} className="  p-2 lg:m-10 lg:p-16">
          <h2 className="text-3xl font-bold text-center">Sign In </h2>
          <div className=" ">
            <label className="font-bold" htmlFor="email">
              Email
            </label>{" "}
            <br />
            <input
              className="w-[100%] h-10 rounded-lg outline-none pl-2 text-xs bg-[#d9d9d9a4] "
              type="email"
              name="email"
              placeholder="Type email"
            />
          </div>
          <div className=" ">
            <label className="font-bold" htmlFor="password">
              Password
            </label>{" "}
            <br />
            <input
              className="w-[100%] h-10 rounded-lg outline-none pl-2 text-xs bg-[#d9d9d9a4] "
              type="password"
              name="password"
              placeholder="Type password"
            />
          </div>

          <div className="mt-5">
            <input
              className="w-full h-10 rounded-lg cursor-pointer bg-blue-500 text-white"
              type="submit"
              value="Sign In"
            />
          </div>

          <div className="mt-5 ">
            <SocialLink />
          </div>

          <p className="font-bold mt-10 text-xs">
            <span>You have a new account please?</span>{" "}
            <Link to={"/join-hr"}>
              <span className="text-[blue] underline">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
