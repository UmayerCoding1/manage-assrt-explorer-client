import React from 'react';
import useRole from '../../../../../hooks/useRole';
import useAuth from '../../../../../hooks/useAuth';
// import useEmRole from '../../../../../hooks/useEmRole';

const Banner = () => {
    const [isRole] = useRole();
    const {companyName} = isRole;
    const {user} = useAuth();
    // const [isEmRole] = useEmRole();
    // const {emImage,companyLogo,role: emRole} = isEmRole;
    return (
        <div className="mt-5 flex flex-col items-center p-2 lg:p-0 justify-between flex-col-reverse lg:flex-row">
        <div className="lg:mt-16">
          <h2 className=" text-7xl lg:text-8xl font-Rozha">Welcome!</h2>
          <h2 className=" text-6xl lg:text-7xl font-bold uppercase">{user.displayName},</h2>
          <p className=" mt-5 text-xs font-bold ">
            Join our dynamic team! Explore exciting career opportunities, enjoy
            flexible work, comprehensive benefits, <br /> and a supportive culture that
            empowers you to grow and succeed at  {companyName} Company.
          </p>
        </div>
  
        <img className="w-[250px] h-[250px]  lg:w-[350px] lg:h-auto rounded-full lg:mt-16" src={user.photoURL} alt="" />
      </div>
    );
};

export default Banner;