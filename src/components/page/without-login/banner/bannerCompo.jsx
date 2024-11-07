import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../../shared/Button/PrimaryButton";

const BannerCompo = ({ img, bannerTitle, subTitle, to, btn }) => {
  return (
    <div className="w-full  lg:h-[80vh]">
      <img className="w-full h-full" src={img} alt="" />
      <div className="w-full h-full bg-[#00000057] absolute top-0 text-white">
        <div className="font-Rozha lg:mt-20 lg:ml-20">
          <h3 className="font-Rozha tracking-cus line-clamp-1">{subTitle}</h3>
          <h1 className="uppercase  text-5xl font-Rozha  tracking-title w-96 lg:text-7xl">
            {bannerTitle}
          </h1>
        </div>
        <div className=" mt-8 lg:ml-20">
          <Link className="" to={`/${to}`}>
            <PrimaryButton text={btn} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerCompo;
