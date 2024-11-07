import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye as EyeOn } from "react-icons/fa";
import { IoMdEyeOff as EyeOff } from "react-icons/io";
import SocialLink from './../../shared/social-link/SocialLink'
import { Link } from "react-router-dom";
import {  mainLogo } from "../../provider/ImageProvider";
const JoinEmployee = () => {
    const [showPass,setShowPass] = useState(true);
    const {
        register,
        handleSubmit,
       reset
      } = useForm();
      const onSubmit = (data) => {
        
        console.log(data)
        // reset();
     }

     const handleEm = e => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
     }




     /**
      * 1: TODO: set password Validation = one uppercase,one lowercase, one special number
      */


  return (
   <>
   <div className="ml-2 mt-2">
     <Link to={'/'}><img className="w-20" src={mainLogo} alt="" /></Link>
   </div>

   <div className="w-full h-[100%] lg:flex items-center justify-center lg:p-20 ">
      <div className=" w-full  lg:w-1/2">
        <DotLottieReact
          src="https://lottie.host/fbdaf249-62b0-4e4c-a7c9-5b7afd65d23b/1m1JuIro8J.json"
          loop
          autoplay
        />
      </div>
console.log();

      <div className="p-2 lg:w-1/2">
        <form onSubmit={handleEm} className="border-2 border-black rounded-lg p-10 ">
          <h2 className="text-4xl text-center font-bold">Join as a employee</h2>
          <div className="mt-5">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <br />
            <input
              className="border-2 border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
              type="text"
              {...register("firstName")}
              placeholder="Type full name"
            />
          </div>

          <div className="mt-5">
            <label className="font-bold" htmlFor="Email">
              Email
            </label>
            <br />
            <input
              className="border-2 border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
              type="text"
              {...register("email")}
              placeholder="Type your email"
            />
          </div>

          <div className="mt-5 relative">
            <label className="font-bold" htmlFor="pass">
              Password
            </label>
            <br />
            <input
              className="border-2 border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
              type={showPass ? 'password' : 'text'}
              {...register("password")}
              placeholder="Type Password"
            />

            <button type="button" onClick={() => setShowPass(!showPass)}  className="absolute top-[50px] right-4 text-lg">{showPass ? <EyeOn/>: <EyeOff/>}</button>
          </div>

          <div className="mt-5">
            <label className="font-bold" htmlFor="full name">
              Date of birth
            </label>
            <br />
            <input
              className="border-2 pr-5 cursor-pointer border-gray-400 rounded-lg outline-none w-full pl-2 h-16"
              type="date"
              {...register("dob")}
              placeholder="Type full name"
            />
          </div>

          <div className="mt-5">
            <input
              className="w-full h-16 rounded-lg cursor-pointer bg-blue-500 text-white "
              type="submit"
              value="Sign Up"
            />
          </div>

          <div className="mt-5">
          <SocialLink/>
          </div>
          <p className="font-bold mt-5 text-xs">You have a already account please? <Link to={'/login'}><span className="text-blue-500">Sign In</span></Link>, or <Link to={'/join-hr'}><span className="text-blue-500">Join as HR</span></Link></p>
        </form>
      </div>
    </div>
   </>
  );
};

export default JoinEmployee;
