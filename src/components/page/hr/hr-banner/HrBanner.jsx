import React from "react";
import useRole from "../../../../hooks/useRole";




 const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const HrBanner = () => {
  const [isRole] = useRole();
  const { name, companyName,logo } = isRole;
 

  return (
    <div className="mt-5 flex flex-col items-center p-2 lg:p-0 justify-between flex-col-reverse lg:flex-row">
      <div className="lg:mt-16">
        <h2 className=" text-7xl lg:text-8xl font-Rozha">Welcome!</h2>
        <h2 className=" text-6xl lg:text-7xl font-bold uppercase">{name},</h2>
        <p className=" mt-5 text-xs font-bold ">
          Join our dynamic team! Explore exciting career opportunities, enjoy
          flexible work, comprehensive benefits, <br /> and a supportive culture that
          empowers you to grow and succeed at <span className="text-lg btn btn-link btn-sm ">HR form {companyName}</span> Company.
        </p>
      </div>

      <img className="w-[250px] h-[250px]  lg:w-[350px] lg:h-auto rounded-full lg:mt-16" src={logo} alt="" />
    </div>
  );
};

export default HrBanner;
