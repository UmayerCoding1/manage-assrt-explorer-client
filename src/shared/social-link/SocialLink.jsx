import React from "react";
import google from "./../../assets/image/google.png";
import useAuth from "./../../hooks/useAuth";

const SocialLink = () => {
  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIN = () => {
    // signInWithGoogle()
    //   .then((result) => {
    //     console.log(result.user);
        
    //   })
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <p className="text-center font-bold text-xs">Sign In with</p>
      <img
        onClick={() => handleGoogleSignIN()}
        className="w-10 mt-5 cursor-pointer"
        src={google}
        alt=""
      /> */}
    </div>
  );
};

export default SocialLink;
